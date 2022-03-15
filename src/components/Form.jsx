import { useState, useEffect } from 'react';
import { RiWhatsappFill, RiFileCopyLine } from "react-icons/ri";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Form = () => {

    // https://api.whatsapp.com/send?phone=${linkData.phone}&text=${linkData.text}
    const [linkData, setLinkData] = useState({
        phone: "",
        message: ""
    });

    const [whatasappApi, setWhatsappApi] = useState("");
    const [resultLink, setResultLink] = useState({
        value: "",
        copied: false
    });

    const [copyText, setCopyText] = useState("Copy To clipboard");
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!linkData.phone || !linkData.message) {
            toast.error("please fill the form");
            return;
        } else {
            setResultLink({ ...resultLink, value: whatasappApi });
        }
    };

    const handleChange = (event) => {
        setLinkData({ ...linkData, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        setWhatsappApi(`https://api.whatsapp.com/send?phone=${linkData.phone}&text=${linkData.message}`);
        // console.log(whatasappApi);
    }, [linkData]);

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <header>
                    <h1>Whastapp Link Generator</h1>
                    <RiWhatsappFill className="whatsapp-icon" />
                </header>
                <div className="row">
                    <label htmlFor="phone">Enter your phone number</label>
                    <input type="text" className="form-control"
                        placeholder="Enter your phone number"
                        name="phone"
                        onChange={handleChange}

                    />
                </div>
                <div className="row">
                    <label htmlFor="">Enter your email message</label>
                    <textarea
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your  message"
                        rows="3"
                        columns="80"
                        name="message"
                    />
                </div>
                <button className="btn">Generate Link</button>
                <div className="result-area">
                    <input type="text" readOnly className="form-control-result"
                        value={resultLink.value}
                    />

                    <CopyToClipboard
                        text={resultLink.value}
                        onCopy={() => {
                            setResultLink({ ...resultLink, copied: true });
                            setCopyText("Copied");
                            toast.success("Copied To Clipboard");
                        }}
                    >
                        <div className="result-text">
                            <span>{copyText}</span>
                            <RiFileCopyLine className="copy-icon" />
                        </div>
                    </CopyToClipboard>
                </div>
            </form>
            <ToastContainer position="top-right" />
        </div>
    );
};
