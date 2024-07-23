import { CsvData } from "../modelos/csvData.model.js";

const ingresarCsvData = async (parametro) => {
  try {
    await CsvData.create(parametro);
  } catch (error) {
    throw error;
  }
};

const obtenerTodosLosDatosCsv = async () => {
  try {
    const datosCsv = await CsvData.findAll();
    return datosCsv;
  } catch (error) {
    throw error;
  }
};

export default { ingresarCsvData, obtenerTodosLosDatosCsv };
