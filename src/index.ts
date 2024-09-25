import  Express  from "express";
import MedicineRoute
from "./router/medicineRouter"
import RouterAdmin from "./router/Router-admin"
const app =Express()
//allow to read a body

app.use(Express.json())
app.use(`/medicine`,MedicineRoute)

app.use("/admin", RouterAdmin)

//add port

const PORT = 1992
app.listen(PORT,() => {
    console.log(`Server DrugStore run on port ${PORT}`)  //logging to console when server is running

})
