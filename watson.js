// Configuracion IBM Watson
const AssistantV2 = require('ibm-watson/assistant/v2');
const {IamAuthenticator} = require('ibm-watson/auth');

// Funcion que contiene la configuracion.
const assistant = new AssistantV2({
    version: '2020-04-01',
    authenticator: new IamAuthenticator({
      apikey: 'lhEHCvz6obh3HTEvdeox3DPRokVErZBYqi7UXUic4ZLc',
    }),
    url: 'https://api.us-south.assistant.watson.cloud.ibm.com',
});

function crearSesion() {
    return assistant.createSession({
        assistantId:'4b1f8519-7066-4fe0-b8e4-94552ad692d0'
    })
}

function deleteSesion(id_session){
    return assistant.deleteSession({
        assistantId: '4b1f8519-7066-4fe0-b8e4-94552ad692d0',
        sessionId: id_session,
      })
}

function sendMessage(input, id_session){
    return assistant.message({
        assistantId: '4b1f8519-7066-4fe0-b8e4-94552ad692d0',
        sessionId: id_session, // Colocar manualmente
        input: {
          'message_type': 'text',
          'text': input
          }
        })
}

module.exports = {
    crearSesion,
    deleteSesion,
    sendMessage
}
/* async function flujo(){
    let session = await crearSesion()
    let id_session = session.result.session_id;
    // console.log(id_session);
    let result = await sendMessage('Hola', id_session)
    let texts = result.result.output.generic
    console.log(texts);
    await deleteSesion(id_session);
}
flujo(); */

/* assistant.message({
    assistantId: '4b1f8519-7066-4fe0-b8e4-94552ad692d0',
    sessionId: 'be82965a-7041-407d-b8e3-c797e4c63e78', // Colocar manualmente
    input: {
      'message_type': 'text',
      'text': 'Reservar cita'
      }
    })
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.log(err);
    }); */



/* // Iniciar Sesion.
assistant.createSession({
    assistantId: '4b1f8519-7066-4fe0-b8e4-94552ad692d0'
  })
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.log(err);
    });

// Cerrar Sesion.
assistant.deleteSession({
    assistantId: '4b1f8519-7066-4fe0-b8e4-94552ad692d0',
    sessionId: 'dfb03492-6baa-4909-9913-4bbd46230eb1',
  })
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.log(err);
    }); */

