import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useMediaQuery } from "react-responsive";

const Contact = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [name]: value });
  };
  // service_zxagxpm
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await emailjs.send(
        "service_zxagxpm",
        "template_fmrkj2r",
        {
          name: form.name,
          title: form.message.substring(0, 50),
          message: form.message,
          email: form.email,
        },
        {
          publicKey: "XD8LtonzVbbFWIzHJ",
        }
      );

      alert("Message Sent Successfully");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="c-space my-20">
      <h3 className="head-text text-white-600">Contact me</h3>
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img
          src="/assets/terminal.png"
          alt="terminal"
          className="absolute inset-0 min-h-screen"
        />
        <div className="contact-container mt-20! md:mt-0! md:min-w-3xl!">
          <h3 className="text-xl md:text-3xl text-center text-white-800">
            Let's Talk
          </h3>
          <p className="text-lg text-white-600 text-center mt-3">
            Wanna build a new website? Just send me a message.
          </p>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-6 md:mt-12 flex flex-col space-y-3 md:space-y-7"
          >
            <label htmlFor="" className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input text-sm! md:text-lg!"
                placeholder="John Doe"
              />
            </label>

            <label htmlFor="" className="space-y-3">
              <span className="field-label">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input text-sm! md:text-lg!"
                placeholder="example@gmail.com"
              />
            </label>

            <label htmlFor="" className="space-y-3">
              <span className="field-label">Your Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={isMobile ? 3 : 5}
                className="field-input text-sm! md:text-lg!"
                placeholder="Hi, I want to build a website for my company. Can you help me with that?"
              />
            </label>

            <button
              className="field-btn hover:cursor-pointer hover:opacity-85"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}

              <img
                src="/assets/arrow-up.png"
                alt="arrow-up"
                className="field-btn_arrow"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
