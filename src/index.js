const app = require('express')()
const routes = require('./routes')

const port = process.env.PORT || 8080 

app.use('/',routes)

//Start server
app.listen(port, () => console.log(`app listening on http://localhost${port}`))



