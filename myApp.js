require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
const Schema = mongoose.Schema

//Creating a person schema
const personSchema = new Schema({
  name: { type: String, required: true }, // OR name: String works too
  age: Number,
  favoriteFoods: [String]
})

//Creating a model called Person from personSchema
let Person = mongoose.model("Person", personSchema);

let arrayOfPeople = [
  {name: "Mabel", age: 26, favoriteFoods: ['Nasi Lemak', 'Char Keuy Teow', 'Papaya']},
  {name: "Vinxi", age: 24, favoriteFoods: ['Nasi Goreng', 'Chee Cheong Fun', 'Lemon']},
  {name: "Lianne", age: 22, favoriteFoods: ['Nasi Goreng Kampung', 'Prawn Mee', 'Apple']},
  {name: "Wyson", age: 18, favoriteFoods: ['Mee Goreng', 'Asam Laksa', 'Grapes']}
]

let personName = "Mabel"

const createAndSavePerson = (done) => {
  //This creates a new document. In this case the document is named mabelLee
  let mabelLee = new Person({
    name: 'Mabel',
    age: 26,
    favoriteFoods: ['Nasi lemak', 'Char Keuy Teow', 'Papaya']
  })
  //Saves the document
  mabelLee.save((err, data) => {
    err ? console.error(err) : done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    err ? console.error(err) : done(null, people)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, foundPerson) => {
    err ? console.error(err) : done(null, foundPerson)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    err ? console.error(err) : done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    err ? console.error(err) : done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) { 
      return console.error(err)
    } else {
      person.favoriteFoods.push(foodToAdd)
      person.save((err, updatedPerson) => {
        err ? console.error(err) : done(null, updatedPerson)
      })
    }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDocument) => {
    err ? console.log(err) : done(null, updatedDocument)
  })  
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
