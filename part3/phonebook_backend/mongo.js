const mongoose = require('mongoose')
const { isCompositeComponent } = require('react-dom/test-utils')

if (process.argv.length < 3) {
    console.log('Please provide the password and phone information as agruments: node mongo.js <password> <name> <number>')
    console.log('To print all entries, provide only the password: node mongo.js <password>')
    process.exit(1)
}

const password  = process.argv[2]
const url = `mongodb+srv://danvidana:${password}@cluster0.nsdvru4.mongodb.net/?retryWrites=true&w=majority`

if(process.argv.length > 3) {
    var name = process.argv[3]
    var number = process.argv[4]
}

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date
})

const Entry = mongoose.model('Entry', entrySchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected!')

        if(process.argv.length == 3) {
            Entry.find({}).then(result => {
                console.log('phonebook:')
                result.forEach(entry => {
                    console.log(`${entry.name}  ${entry.number}`)
                })
                mongoose.connection.close()
            })
        } else {
            const entry = new Entry({
                name: name,
                number: number,
                date: new Date()
            })
            return entry.save()
                .then(() => {
                    console.log(`added ${name} number ${number} to phonebook`)
                    return mongoose.connection.close()
                })
        }
    })
    .catch((err) => {
        console.log(err)
    })