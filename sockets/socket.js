const { io }= require('../index');

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    
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
        console.log('Mensajeeee', payload);

        io.emit('nuevo-mensaje', payload ); //emite a todos incluido el emisor
        //client.broadcast.emit('nuevo-mensaje', 'Heyyy' ); //emite a todos menos al emisor
    })

  });