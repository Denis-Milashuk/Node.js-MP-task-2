import morgan from "morgan";

const loggerFormat = "[:date[iso]] Request: :method :url :status :response-time ms - :res[content-length]";

export const morganLogger = morgan(loggerFormat, { stream: process.stdout });
