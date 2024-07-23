import React, { useState } from "react";
import '../css/estilos.css';

const Upload: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [files, setFiles] = useState<File[]>([]);

    const guardarArchivos = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const fileList = e.target.files;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        let allFilesValid = true;

        const validatedFiles = Array.from(fileList || []).filter(file => {
            if (!allowedTypes.includes(file.type)) {
                setError('Uno o más archivos seleccionados no son imágenes válidas.');
                allFilesValid = false;
                return false;
            }
            return true;
        });

        if (allFilesValid) {
            setFiles(validatedFiles);
        }
    }

    const subirArchivos = () => {
        setError(null);
        setLoading(true);
        const promises: Promise<void>[] = [];

        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            const promise = new Promise<void>((resolve, reject) => {
                reader.onload = () => {
                    const rawLog = reader.result?.toString().split(',')[1];
                    const dataSend = {
                        dataReq: { data: rawLog, name: file.name, type: file.type },
                        fname: "uploadFilesToGoogleDrive"
                    };
                    fetch('https://script.google.com/macros/s/AKfycbwotwFIC1oci3zturGpXKc4kCAm7gY-zMOcIZZ2gApXHqi3-BXTrHC8qcT7G1vneexe/exec',
                        { method: "POST", body: JSON.stringify(dataSend) })
                        .then(res => {
                            if (!res.ok) {
                                throw new Error('Error al subir el archivo');
                            }
                            return res.json();
                        })
                        .then(() => {
                            resolve();
                        })
                        .catch(e => {
                            setError('Error al subir uno o más archivos.');
                            reject();
                        });
                };
            });
            promises.push(promise);
        });

        Promise.all(promises)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    return (
        <div className="App">
            <div className="App-header">
                <input type="file" accept="image/*" id="customFile" onChange={guardarArchivos} multiple />
                <button type="button" onClick={subirArchivos} disabled={files.length === 0}>Subir Imágenes</button>
                {loading && <div className="loading">Cargando...</div>}
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );
}

export default Upload;
