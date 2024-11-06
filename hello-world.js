const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3000

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const studentList = [
  {
    "firstName":"Aryan",
    "lastName":"Jabbari",
    "sId":"234",
    "school":"Queens College",
    "major":"Computer Science"
  },
  {
    "firstName":"Lidia",
    "lastName":"De La Cruz",
    "sId":"333",
    "school":"Harvard",
    "major":"Philanthrophy"},
  {
    "firstName":"Brian",
    "lastName":"De Los Santos",
    "sId":"468",
    "school":"John Jay",
    "major":"Computer Science"
  },
  {
    "firstName":"Adam",
    "lastName":"Albaghali",
    "sId":"589",
    "school":"Brooklyn College",
    "major":"Computer Science"
  },
  {
    "firstName":"Nathan",
    "lastName":"Vazquez",
    "sId":"559",
    "school":"Hunter College",
    "major":"Computer Science"
  },
  {
    "firstName":"Ynalois",
    "lastName":"Pangilinan",
    "sId":"560",
    "school":"Hunter College",
    "major":"Computer Science"
  },
  {
    "firstName":"Shohruz",
    "lastName":"Ernazarov",
    "sId":"561",
    "school":"Hunter College",
    "major":"Computer Science"
  },
  {"firstName":"Kevin",
    "lastName":"Orta",
    "sId":"562",
    "school":"John Jay",
    "major":"Computer Science"
  }
]

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.get('/students', async (req, res) => {
  // if (req.query.school.includes('Admin')) {
  //   res.status(405).json({ message: 'Not allowed' })
  // }
  if(req.query) {
    const propertyNames = Object.keys(req.query)
    let students = await prisma.student.findMany()
    for (const propertyName of propertyNames) {
      students = students.filter((student) => student[propertyName] === req.query[propertyName])
    }
    res.json(students)
  }
  else {
    res.json(studentList)
  }
})

app.get('/students/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)

  const student = await prisma.student.findUnique({where: {sId: id}})
  //const student = studentList.find(s => s.sId === id)
  if (student) {
    res.json(student)
  } else {
    res.status(404).json({ message: `Student with id ${id} not found.` })
  }
})

app.post('/students', async (req, res) => {
  console.log(req.body)
  const students = await prisma.student.create({ data: req.body });
  //studentList.push(req.body)
  res.json({message : "Student added"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})