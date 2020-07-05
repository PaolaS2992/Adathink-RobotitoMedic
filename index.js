var express = require("express");
var {FB, 
    Text, 
    Typing, 
    Image, 
    QuickReplies,
    QuickRepliesOption, 
    DownloadFile} = require("adathink-sdk-bot");

var app = express();

const { crearSesion, sendMessage, deleteSesion } = require("./watson");

app.use(express.json());

FB.config({
    TOKEN_FACEBOOK:'EAAJZC7v0019MBABRakraqQZAbeKIhh1NrsPeLfKJ0tPZCXBIUKZBJtZAv0FZAgsZCvPX7EwIiPd5fndsxtFTIZCmN0ldE7Qk4DlhlIZCFZA0yIu1Dz7KMqaKKpPLnz3seA5f2nkxufKiTcSOroGPk0ZBUrk1CZCyebzVeMOcrSsuO6rv7AZDZD',
    KEY_FACEBOOK: 'Robotito'
});

//Enlaza el servidor con Facebook.
app.get('/', FB.checkWebhook);

//DB local
const user = {
}

app.post('/', async (req, res) => {
    // Enviar OK 200 a Facebook.
    res.sendStatus(200);

    //Instaciamos la Clase FB pasando como parametro el request que nos envia FAcebook
    var FBTools =  new FB(req.body);

    // Inicio de Sesion
    let id = FBTools.getId();
    let session_id

    if(user[id]){
        session_id = user[id]
    } else {
        let session = await crearSesion()
        session_id = session.result.session_id
        user[id] = session_id
    }
    console.log('Soy el ID de la Sesion: ', session_id);

    // Obtine el mensaje de texto del usuario
    let message = FBTools.getMessage();
    console.log(message);

    // Puente con IBM Watson.
    let result = await sendMessage(message, session_id);
    let message_watson = result.result.output.generic;

    // Obtener Información del Perfil de Facebook.
    let userActual = await FBTools.getInfoUser();
    let texto2 = new Text('¡ Bienvenid@ ' + userActual.first_name + ' :D !');
    // console.log('texto2....', texto2);

    // Recorrer Mensajes.
    message_watson.forEach((item) => {
    // console.log('item: ', item);
        
            switch(item.response_type){
                case 'text':
                    FBTools.addResponse(new Text(item.text))
                    // console.log(item.text);
                    if(item.text === null){
                        FBTools.addResponse(texto2);
                    }
                    break;
                case 'option':
                    let quick_replies = new QuickReplies(item.title)
                    // console.log('Soy item.options', item.options);
                    // Recorrer option.
                    item.options.forEach((option) => {
                        let label = option.label
                        let value = option.value.input.text
                        let op = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_TEXT, label, value, 'https://static9.depositphotos.com/1575949/1194/v/950/depositphotos_11947368-stock-illustration-red-heart-shape-with-medical.jpg');
                        quick_replies.addOption(op);
                        // console.log('Soy value: ', value);
                    });
                    FBTools.addResponse(quick_replies);
                    break;
                case 'image':
                    FBTools.addResponse(new Image(item.source));
                    break;
            }
        
    });

    // Mostrar mensaje en Facebook.
    let response_send = await FBTools.sendResponse();

});

app.listen(process.env.PORT || 3000, () => {
    console.log("Mi servidor esta ejecutando :) !!!");
});