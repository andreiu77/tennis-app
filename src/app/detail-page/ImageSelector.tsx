import React, { useEffect, useState } from "react";
import "./ImageSelector.css";

const ImageSelector = ({ selected, onSelect, onClose }) => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        fetch("/api/images")
            .then((res) => res.json())
            .then(setImages)
            .catch((err) => console.error("Error loading images:", err));
    }, []);

    return (
        <div className="image-selector-overlay">
            <div className="image-selector-modal">
                <h2>Select an Image</h2>
                <button className="close-btn" onClick={onClose}>×</button>
                <div className="image-grid">
                    {images.map((url) => (
                        <img
                            key={url}
                            src={url}
                            alt=""
                            className={selected === url ? "selected" : ""}
                            onClick={() => {
                                onSelect(url);
                                onClose(); // auto-close on selection
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSelector;
