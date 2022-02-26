import app from './server';
app.listen(app.get('port'),()=>console.log(`listening on http://localhost:${app.get('port')}`));