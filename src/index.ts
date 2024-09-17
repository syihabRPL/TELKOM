import  Express  from "express";
import MedicineRoute
from "./router/medicineRouter"
const app =Express()
//allow to read a body

app.use(Express.json())
app.use(`/medicine`,MedicineRoute)

//add port

const PORT = 1992
app.listen(PORT,() => {
    console.log(`Server DrugStore run on port ${PORT}`)  //logging to console when server is running

})
