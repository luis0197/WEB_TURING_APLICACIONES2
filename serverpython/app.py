from flask import Flask, request, jsonify, send_file, send_file
import csv
import datetime
import cv2
import numpy as np
from ultralytics import YOLO
from PIL import Image
import os
from flask_cors import CORS
from werkzeug.utils import secure_filename
import pandas as pd
import matplotlib
matplotlib.use('Agg') 
import matplotlib.pyplot as plt
import seaborn as sns
import io
from io import BytesIO

app = Flask(__name__)
CORS(app)

# Cargar el modelo YOLO preentrenado
#model = YOLO('best.pt')  # Ruta del modelo cargado

# Variables globales
save_directory = ""
csv_file = None
csv_writer = None
confidence_slider = 0.5
latest_image_path = None

# Inicializar el escritor CSV
def init_csv_writer():
    global csv_writer, csv_file, save_directory
    csv_file_path = os.path.join(save_directory, "detections_log.csv")
    if not os.path.exists(csv_file_path):
        csv_file = open(csv_file_path, 'w', newline='')
        csv_writer = csv.writer(csv_file)
        # Escribir encabezado con fecha como primera columna
        csv_writer.writerow(['Fecha & Hora', 'Conductor', 'Peatón', 'Bicicleta', 'Carro', 'Furgoneta', 'Camión', 'Triciclo', 'Bus', 'Moto'])
    else:
        csv_file = open(csv_file_path, 'a', newline='')
        csv_writer = csv.writer(csv_file)

# Inicializar el escritor CSV para promedios de confianza
def init_confidence_csv_writer():
    global confidence_csv_writer, confidence_csv_file, save_directory
    csv_file_path = os.path.join(save_directory, "confidence_averages.csv")
    if not os.path.exists(csv_file_path):
        confidence_csv_file = open(csv_file_path, 'w', newline='')
        confidence_csv_writer = csv.writer(confidence_csv_file)
        # Escribir encabezado
        #csv_writer.writerow(['clase', 'Conductor', 'Peatón', 'Bicicleta', 'Carro', 'Furgoneta', 'Camión', 'Triciclo', 'Bus', 'Moto'])
    else:
        confidence_csv_file = open(csv_file_path, 'a', newline='')
        confidence_csv_writer = csv.writer(confidence_csv_file)

# Función para inicializar el contador de clases
def init_class_counter():
    return {
        'Conductor': 0,
        'Peatón': 0,
        'Bicicleta': 0,
        'Carro': 0,
        'Furgoneta': 0,
        'Camión': 0,
        'Triciclo': 0,
        'Bus': 0,
        'Moto': 0
    }

# Función para inicializar el contador de confianzas
def init_confidence_counter():
    return {
        'Conductor': [],
        'Peatón': [],
        'Bicicleta': [],
        'Carro': [],
        'Furgoneta': [],
        'Camión': [],
        'Triciclo': [],
        'Bus': [],
        'Moto': []
    }

# Guardar las detecciones en el archivo CSV
def save_detections(timestamp, class_counter):
    global csv_writer, csv_file
    if csv_writer:
        csv_writer.writerow([timestamp] + [class_counter[key] for key in class_counter])
        csv_file.flush()  # Asegurarse de que se escriban los datos
    else:
        print("csv_writer no está inicializado")

# Guardar los promedios de confianza en el archivo CSV
def save_confidence_averages(confidence_counter):
    global confidence_csv_writer, confidence_csv_file
    if confidence_csv_writer:
        if confidence_csv_file.tell() == 0:
            # Si el archivo está vacío, escribir el encabezado
            confidence_csv_writer.writerow(['Clase'] + list(confidence_counter.keys()))

        # Escribir los promedios de confianza
        average_confidences = []
        for class_name, confidences in confidence_counter.items():
            if confidences:
                average_confidence = sum(confidences) / len(confidences)
            else:
                average_confidence = 0.0  # Si no hay confianzas registradas, usar 0.0
            average_confidences.append(average_confidence)

        confidence_csv_writer.writerow(['Conf Promedio'] + average_confidences)
        confidence_csv_file.flush()  # Asegurarse de que se escriban los datos
    else:
        print("confidence_csv_writer no está inicializado")

# Leer los datos del archivo CSV
def read_csv_data():
    global save_directory
    csv_file_path = os.path.join(save_directory, "detections_log.csv")
    data = []
    if os.path.exists(csv_file_path):
        with open(csv_file_path, 'r') as csvfile:
            csv_reader = csv.reader(csvfile)
            header = next(csv_reader)
            last_row = None
            for row in csv_reader:
                last_row = row  # Mantén la última fila
            if last_row:
                data.append(dict(zip(header, last_row)))
    return data

@app.route('/process', methods=['POST'])
def datos():
    global save_directory, confidence_slider

    # Obtener los datos del formulario
    directory_path = request.form.get('directoryPath')
    confidence = float(request.form.get('confidence', confidence_slider))
    file = request.files['file']
    model_name = request.form.get('model', 'best.pt')  # Obtener el parámetro del modelo

    # Actualizar variables globales si se proporcionan nuevos valores
    if directory_path:
        save_directory = directory_path
        init_csv_writer()  # Inicializar el escritor CSV cuando se proporciona un nuevo directorio
        init_confidence_csv_writer()  # Inicializar el escritor CSV para promedios de confianza
    
    confidence_slider = confidence

    # Guardar la imagen procesada con un nombre único basado en la fecha y hora
    timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    if file:
        filename = secure_filename(file.filename)
        image_path = os.path.join(save_directory, f"processed_{timestamp.replace(':', '')}{filename}")
        file.save(image_path)
        print(f"Ruta de la imagen procesada: {image_path}, confianza: {confidence_slider}, model: {model_name}")

        # Procesar la imagen
        processed_image_path = process_image(image_path, confidence_slider, model_name)

        # Leer los datos del CSV actualizados
        csv_data = read_csv_data()  # Llamar a la función para obtener la última entrada del CSV

        return jsonify({
            "message": "Archivo guardado y procesado exitosamente",
            "filename": filename,
            "confidence": confidence_slider,
            "saveDirectory": save_directory,
            "processedImagePath": processed_image_path,
            "model": model_name,
            "csv_data": csv_data
        }), 200
    else:
        return jsonify({"error": "No se recibió ningún archivo"}), 400

# Función para procesar la imagen
def process_image(image_path, confidence_slider, model_name):
    global save_directory

    model = YOLO(model_name)
    
    # Leer la imagen desde el archivo
    frame = cv2.imread(image_path)

    # Obtener el valor del deslizador de confianza
    confidence_threshold = confidence_slider

    # Ejecutar la inferencia en la imagen
    results = model.predict(frame, conf=confidence_threshold)

    # Inicializar el contador de clases y de confianzas
    class_counter = init_class_counter()
    confidence_counter = init_confidence_counter()

    # Procesar los resultados
    for result in results:
        for i, box in enumerate(result.boxes.xyxy):
            class_id = int(result.boxes.cls[i])
            confidence = float(result.boxes.conf[i])
            if class_id not in [2, 3, 4, 5, 6, 7, 8, 9]:
                class_name = 'Conductor' if result.names[class_id] == 'people' else 'Peatón'
            else:
                class_name = result.names[class_id]
                if class_id == 2:
                    class_name = 'Bicicleta'
                elif class_id == 3:
                    class_name = 'Carro'
                elif class_id == 4:
                    class_name = 'Furgoneta'
                elif class_id == 5:
                    class_name = 'Camión'
                elif class_id in [6, 7]:
                    class_name = 'Triciclo'
                elif class_id == 8:
                    class_name = 'Bus'
                else:
                    class_name = 'Moto'

            # Incrementar el contador de la clase correspondiente y añadir confianza
            if class_name in class_counter:
                class_counter[class_name] += 1
                confidence_counter[class_name].append(confidence)

    # Registrar el evento en el archivo CSV
    timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H-%M-%S')
    save_detections(timestamp, class_counter)

    # Guardar los promedios de confianza en el archivo CSV
    save_confidence_averages(confidence_counter)

    # Obtener el frame con las detecciones
    result_frame = results[0].plot()

    # Convertir el frame en un formato que PIL pueda manejar
    img = Image.fromarray(result_frame)

    # Guardar la imagen procesada
    processed_image_path = os.path.join(save_directory, f"processed_{timestamp.replace(':', '_')}.png")
    img.save(processed_image_path)
    
    return processed_image_path

@app.route('/processed-image', methods=['GET'])
def get_processed_image():
    global save_directory

    # Obtener una lista de todos los archivos en el directorio de guardado
    files = os.listdir(save_directory)
    
    # Filtrar solo los archivos de imagen procesados
    image_files = [f for f in files if f.startswith("processed_") and f.endswith(".png")]
    
    # Ordenar los archivos por fecha de modificación (último creado)
    image_files.sort(key=lambda x: os.path.getmtime(os.path.join(save_directory, x)), reverse=True)

    if image_files:
        latest_image_path = os.path.join(save_directory, image_files[0])

        # Verificar que el archivo existe
        if os.path.exists(latest_image_path):
            # Enviar el archivo al cliente con el tipo de contenido correcto
            response = send_file(latest_image_path, mimetype='image/png', as_attachment=True)
            
            return response
        else:
            return jsonify({"error": "El archivo de imagen no se encuentra en el servidor"}), 404
    else:
        return jsonify({"error": "No se encontró ninguna imagen procesada"}), 404

@app.route('/csv-data', methods=['GET'])
def get_csv_data():
    # Leer los datos del CSV y enviarlos al cliente
    csv_data = read_csv_data()
    return jsonify(csv_data)


# Leer los datos del archivo CSV
def read_csv_data2():
    global save_directory
    csv_file_path = os.path.join(save_directory, "confidence_averages.csv")
    data = []
    if os.path.exists(csv_file_path):
        with open(csv_file_path, 'r') as csvfile:
            csv_reader = csv.reader(csvfile)
            header = next(csv_reader)
            last_row = None
            for row in csv_reader:
                last_row = row  # Mantén la última fila
            if last_row:
                data.append(dict(zip(header, last_row)))
    return data

@app.route('/csv-data2', methods=['GET'])
def get_csv_data2():
    # Leer los datos del CSV y enviarlos al cliente
    csv_data = read_csv_data2()
    return jsonify(csv_data)

# Cambiar el backend de Matplotlib
plt.switch_backend('Agg')

@app.route('/calculate-std-dev', methods=['GET'])
def calculate_std_dev():
    # Path al archivo CSV de desviaciones estándar de confianza
    confidence_file_path = 'processed_images/confidence_std_devs.csv'
    
    # Cargar el archivo CSV
    data = pd.read_csv(confidence_file_path, encoding='latin1')

    # Verificar si 'Conf Promedio' está en el DataFrame antes de eliminarlo
    if 'Conf Promedio' in data.columns:
        data = data.drop(columns=['Conf Promedio'])

    # Reemplazar valores cero con NaN
    data.replace(0, np.nan, inplace=True)

    # Eliminar explícitamente la primera columna
    data = data.iloc[:, 1:]  # Eliminar la primera columna

    # Calcular la desviación estándar para cada columna
    std_dev = data.std()

    # Obtener la última fila como un diccionario
    last_row = data.iloc[-1].to_dict()

    # Corregir los nombres según el formato especificado
    corrected_names = {
        'Conductor': 0,
        'Peatón': 0,
        'Bicicleta': 0,
        'Carro': 0,
        'Furgoneta': 0,
        'Camión': 0,
        'Triciclo': 0,
        'Bus': 0,
        'Moto': 0
    }

    # Actualizar last_row con los nombres corregidos
    last_row = {key: last_row.get(key, 0) for key in corrected_names}

    # Generar el gráfico de barras horizontal con Matplotlib
    fig, ax = plt.subplots(figsize=(10, 6))
    bars = ax.barh(list(last_row.keys()), list(last_row.values()), color='#6b48ff')
    ax.set_xlabel('Desviación Estándar')
    ax.set_ylabel('Categorías')
    ax.set_title('Desviaciones Estándar por Categoría')
    
    # Añadir etiquetas con los valores de las barras sin redondear
    for bar, value in zip(bars, list(last_row.values())):
        ax.text(bar.get_width() + 0.01, bar.get_y() + bar.get_height() / 2, f'{value}', ha='left', va='center')

    # Convertir el gráfico a BytesIO
    image_stream = BytesIO()
    plt.savefig(image_stream, format='png')
    image_stream.seek(0)

    # Cerrar la figura de Matplotlib para liberar memoria
    plt.close(fig)

    # Devolver la imagen como bytes al frontend
    return send_file(image_stream, mimetype='image/png')

@app.route('/detections-over-time', methods=['GET'])
def detections_over_time():
    # Path to the detections log CSV file
    log_file_path = 'processed_images/detections_log.csv'
    
    # Read the CSV file
    data = pd.read_csv(log_file_path, encoding='latin1')

    # Ensure the column name is exactly as expected
    date_column = 'Fecha & Hora'
    if date_column not in data.columns:
        return f"Column '{date_column}' not found in the CSV file.", 400
    
    # Parse the dates in 'Fecha & Hora' column
    data[date_column] = pd.to_datetime(data[date_column], format='%Y-%m-%d %H-%M-%S')
    
    # Set 'Fecha & Hora' as the index
    data.set_index(date_column, inplace=True)

    # List of vehicle categories
    categories = ['Conductor', 'Peatón', 'Bicicleta', 'Carro', 'Furgoneta', 'Camión', 'Triciclo', 'Bus', 'Moto']

    # Resample the data to count detections over time (assuming you want a sum over each time interval)
    resampled_data = data.resample('T').sum()  # Resample to minutes

    # Generate a line chart
    plt.figure(figsize=(12, 8))
    for category in categories:
        plt.plot(resampled_data.index, resampled_data[category], label=category,linewidth=2)

    plt.xlabel('Tiempo')
    plt.ylabel('Número de Detecciones')
    plt.title('Número de Detecciones a lo largo del Tiempo por Categoría de Vehículo')
    plt.legend()

    # Convert the chart to BytesIO
    image_stream = BytesIO()
    plt.savefig(image_stream, format='png')
    image_stream.seek(0)

    # Close the figure to free up memory
    plt.close()

    # Return the image as bytes to the frontend
    return send_file(image_stream, mimetype='image/png')
if __name__ == "__main__":
    app.run(debug=True)
