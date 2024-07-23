import csvDataRepositories from "../repositories/csvData.repositories.js";

import { CustomError } from "../errors/index.error.js";

const ingresarCsvData = async (parametro) => {
  try {
    const dataToInsert = {
      confidence: parametro.confidence,
      model: parametro.model,
      processedImage: parametro.processedImage ,
    };

    const csvData = parametro.csvData[0];
    Object.keys(csvData).forEach((key) => {
      // Convertir nombres a minúsculas, eliminar espacios y reemplazar caracteres especiales
      const field = key
        .toLowerCase()
        .replace(" ", "")
        .replace("ñ", "n")
        .replace("á", "a")
        .replace("é", "e")
        .replace("í", "i")
        .replace("ó", "o")
        .replace("ú", "u");
      dataToInsert[field] = parseInt(csvData[key], 10);
    });
    console.log(parametro);
    await csvDataRepositories.ingresarCsvData(dataToInsert);

  } catch (error) {
    throw new CustomError(
      "Error servicio  al ingresar los datos del csv",
      500,
      error
    );
  }
};

const obtenerTodosLosDatosCsv = async () => {
  try {
    const datosCsv = await csvDataRepositories.obtenerTodosLosDatosCsv();
    return datosCsv;
  } catch (error) {
    throw new CustomError(
      "Error servicio  al obtener los datos del csv",
      500,
      error
    );
  }
};

export default { ingresarCsvData, obtenerTodosLosDatosCsv };
