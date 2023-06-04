import { Router } from "express";
import VoluntarioController from "../controller/VoluntarioController.js";


const route = new Router();
const controller = new VoluntarioController();

route.get("/",controller.consultarTodos)
route.post("/",controller.gravar)
route.patch("/",controller.atualizar)
route.delete("/",controller.excluir)

export default route