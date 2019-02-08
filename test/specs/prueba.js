const assert = require('assert');
const correo = "correo@uniandes.edu.co", password = "123456789", url = 'https://losestudiantes.co';

describe('Login en los estudiantes', function() {
    it('debería visitar los estudiantes y fallar en el login', function () {
        
        browser.url(url);
        
        $('button*=Cerrar').click();
        
        const btnIngresar = $('button*=Ingresar');
        btnIngresar.waitForDisplayed(10000);
        btnIngresar.click();
        
        var cajaLogIn = $('div.cajaLogIn');
        cajaLogIn.waitForDisplayed(10000);
        
        var mailInput = cajaLogIn.$('input[name="correo"]');
        mailInput.click();
        mailInput.keys(correo);
        
        
        var passwordInput = cajaLogIn.$('input[name="password"]');
        passwordInput.click();
        passwordInput.keys(password);
        
        cajaLogIn.$('button=Ingresar').click();
        
        const labelError = $('.aviso.alert.alert-danger');
        labelError.waitForDisplayed(10000);
        
        const alertText = browser.$('.aviso.alert.alert-danger').getText();
        console.log(alertText);
        
        const mensajeError = 'Upss! El correo y la contraseña que ingresaste no figuran en la base de datos. Intenta de nuevo por favor.';
        assert.equal(alertText, mensajeError);
        
    });
});

describe('Carga de perfil docente', function() {
    it('debera mostrar el perfil de un docente', function () {
        
        browser.url(url);
        
        // Activar si se hace individual
        //$('button*=Cerrar').click();
        
        const select = $('#sample_select');
        select.click();
        select.selectByVisibleText('Estudio una maestria');

        const selectm = $('.select');
        selectm.click();
        selectm.selectByVisibleText('Maestría en Derecho');

        const docente = $('a[href="universidad-de-los-andes/derecho/profesores/julieta-lemaitre-ripoll"]');
        docente.click();
        
        $('.infoProfesor').waitForExist(10000);
        $('.columnMiddle').waitForDisplayed(10000);

        assert.equal(browser.getUrl(), 'https://losestudiantes.co/universidad-de-los-andes/derecho/profesores/julieta-lemaitre-ripoll');

    });
});


describe('Carga de perfil docente y filtro de materia', function() {
    it('debera mostrar el perfil de un docente y seleccionar una materia', function () {
        
        browser.url(url);
        
        // Activar si se hace individual
        //$('button*=Cerrar').click();
        
        const select = $('#sample_select');
        select.click();
        select.selectByVisibleText('Estudio una maestria');

        const selectm = $('.select');
        selectm.click();
        selectm.selectByVisibleText('Maestría en Ingeniería de Software');

        const docente = $('a[href="universidad-de-los-andes/ingenieria-de-sistemas/profesores/mario-linares-vasquez"]');
        docente.click();
        
        $('input[name="id:MISO4208"]').waitForExist(10000);
        $('input[name="id:MISO4208"]').click();

        assert.equal($('#profesor_cantidad').getText(), 2);
        
    });
});
