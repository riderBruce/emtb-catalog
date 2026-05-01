import type { Bike } from "../types/bike.types";
import create from "./http-service";

export default create<Bike>("/bikes");