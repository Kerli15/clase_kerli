const ContactosModel = require("../models/ContactosModel");
const nodemailer = require('nodemailer');
const CORREO_USUARIO = process.env.CORREO_USUARIO;
const CORREO_CONTRA = process.env.CORREO_CONTRA;
const CORREO_DESTINO = process.env.CORREO_DESTINO;



class ContactosController {
  constructor() {
    this.contactosModel = new ContactosModel();
    this.add = this.add.bind(this);
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: CORREO_USUARIO,
        pass: CORREO_CONTRA
      }
    });
  }

  EnvioDeCorreo(email, name, mensaje, CORREO_USUARIO, CORREO_DESTINO) {
    const mailOptions = {
      from: CORREO_USUARIO,
      to: CORREO_DESTINO,
      subject: 'Nuevo registro de usuario',
      text: 'Nombre: '+name+'\nEmail: '+email+'\nMensaje: '+mensaje
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Correo enviado');
      }
    });
  }

  async obtenerIp() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip; // Retorna la ip
    } catch (error) {
      console.error('Error al obtener la ip:', error);
      return null; // Retorna null si hay un error
    }
  }


  async obtenerPais(ip) {
    try {
      const response = await fetch('https://ipinfo.io/'+ip+'?token=7a1fb4d0cf1645');
      const data = await response.json();
      return data.country; // Retorna el país
    } catch (error) {
      console.error('Error al obtener el país:', error);
      return null; // Retorna null si hay un error
    }
  }

  async add(req, res) {
    // Validar los datos del formulario

    const { email, name, mensaje } = req.body;

    if (!email || !name || !mensaje) {
      res.status(400).send("Faltan campos requeridos");
      return;
    }

    // Guardar los datos del formulario
    const ip = await this.obtenerIp();
    const fecha = new Date().toISOString();
    const pais = await this.obtenerPais(ip);

   
    await this.contactosModel.crearContacto(email, name, mensaje, ip, fecha, pais);

    const contactos = await this.contactosModel.obtenerAllContactos();

    await this.EnvioDeCorreo(email, name, mensaje, CORREO_USUARIO, CORREO_DESTINO);

    console.log(contactos);

    // Redireccionar al usuario a una página de confirmación
    res.send("Ya tengo tus datos, gracias por contactar conmigo!!!");
  }
}

module.exports = ContactosController;
