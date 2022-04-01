const { io }= require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');
const bands = new Bands();

bands.addBand( new Band('Queen') );
bands.addBand( new Band('Nofx') );
bands.addBand( new Band('Leo Garcia') );
bands.addBand( new Band('Talk Talk') );
console.log(bands);

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });

    client.on('connect', () => { 
        console.log('Cliente conectado de otro')
    });

    client.on('mensaje', (payload)=> {
        console.log('Mensajeeee', payload);

        io.emit('mensaje', {admin: 'New msg'} );
    })

    client.on('emitir-mensaje', (payload)=> {
        //console.log('Mensajeeee', payload);

        //io.emit('nuevo-mensaje', payload ); //emite a todos incluido el emisor
        client.broadcast.emit('nuevo-mensaje', payload ); //emite a todos menos al emisor
    })

    client.on('vote-band', (payload) => {
        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        const newBand = new Band( payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

  });