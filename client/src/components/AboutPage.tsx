import ReactMarkdown from "react-markdown";
import readme from "../../../README.md?raw";

const AboutPage = () => {
  return (
    <div className="container py-4" style={{ maxWidth: "960px" }}>
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <ReactMarkdown>{readme}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;