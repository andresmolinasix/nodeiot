import React, { useState } from 'react';

const Footer = () => {
    const [logo, setLogo] = useState(null);

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <footer className="custom-bg text-white py-4 fixed bottom-0 left-0 right-0">
            <div className="container mx-auto flex flex-col items-center">
                <div className="flex flex-row text-center justify-center mt-4">
                    {/* Ruta de la imagen del logo */}
                    <img
                        src="/NodeBanner.png" // Ruta a la imagen en la carpeta public
                        alt="Logo"
                        className="h-12 w-auto object-contain"
                        style={{ maxWidth: '400px', height: 'auto' }}
                    />
                    <p className="text-center ml-4">
                        © {new Date().getFullYear()} Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;