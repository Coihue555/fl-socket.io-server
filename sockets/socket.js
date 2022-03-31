const { io }= require('../index');

//Mensajes de sockets
io.on('connection', client => {
    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });

    client.on('mensaje', (payload)=> {
        console.log('Mensajeeee', payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'} );
    })

  });