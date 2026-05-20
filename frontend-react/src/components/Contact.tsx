import { useState } from "react";
import emailjs from "@emailjs/browser"

const Contact = () => {

    //State for form
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const publicKey = "MYxNqyMrIQYxGJjSk";

        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        }

        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPATE_ID,
                formData,
                publicKey
            )
            .then(() => {
                console.log("Email sent successfully");
                alert("Your message has been sent successfully")
                setName("");
                setEmail("");
                setSubject("");
                setMessage("");
            })
            .catch((err) => {
                console.log("Failed to send email: ", err);
                alert(`${err.text}`);
            });


    }


    return (
        <section className="mt-[25dvh] scroll-mt-18" id="contact">
            <div className="flex flex-col md:rounded-sm md:flex-row gap-5 bg-[#F5F5F7] w-full max-w-6xl mx-auto p-6">
                <div className="md:w-1/2">
                    <h3 className="relative text-3xl font-bold mb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-[4rem] after:h-0.75 after:bg-linear-to-r after:from-[#7AA6F7] after:to-violet-500">Let's Connect</h3>
                    <p className="text-wrap text-[#656565]">
                        Whether you have a project in mind, a question about my work, or just want to say hello — my inbox is open.
                    </p>
                </div>
                <div className="md:w-1/2">
                    <h3 className="relative text-3xl font-bold mb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-[4rem] after:h-0.75 after:bg-linear-to-r after:from-[#7AA6F7] after:to-violet-500">Message</h3>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div className="relative">
                            <input className="peer border border-[#ced4da] rounded w-full pt-5 pr-2 pb-2 pl-2 bg-white" placeholder=" " type="text" id="connect-name" required value={name} onChange={(e) => setName(e.target.value)}/>
                            <label className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[0.7rem] peer-focus:text-[#7AA6F7] peer-focus:-translate-y- peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:-translate-y-1/2 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:text-[#7AA6F7] peer-[:not(:placeholder-shown)]:-translate-y-">Name</label>
                        </div>

                        <div className="relative">
                            <input className="peer border border-[#ced4da] rounded w-full pt-5 pr-2 pb-2 pl-2 bg-white" placeholder=" " type="email" id="connect-email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <label className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[0.7rem] peer-focus:text-[#7AA6F7] peer-focus:-translate-y- peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:-translate-y-1/2 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:text-[#7AA6F7] peer-[:not(:placeholder-shown)]:-translate-y-">Email</label>
                        </div>

                        <div className="relative">
                            <input className="peer border border-[#ced4da] rounded w-full pt-5 pr-2 pb-2 pl-2 bg-white" placeholder=" " type="text" id="connect-subject" required value={subject} onChange={(e) => setSubject(e.target.value)}/>
                            <label className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[0.7rem] peer-focus:text-[#7AA6F7] peer-focus:-translate-y- peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:-translate-y-1/2 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:text-[#7AA6F7] peer-[:not(:placeholder-shown)]:-translate-y-" htmlFor="connect-subject">Subject</label>
                        </div>

                        <div className="relative">
                            <textarea className="peer border border-[#ced4da] rounded w-full pt-5 pr-2 pb-2 pl-2 bg-white" placeholder=" " id="connect-message" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            <label className="absolute left-2 top-4 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[0.7rem] peer-focus:text-[#7AA6F7] peer-focus:-translate-y- peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:-translate-y-1/2 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:text-[#7AA6F7] peer-[:not(:placeholder-shown)]:-translate-y-" htmlFor="connect-message">Message</label>
                        </div>

                        <button className="bg-blue-600 hover:bg-blue-700 rounded-sm p-2 text-white font-bold w-full mt-2 transition-color duration-300" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;