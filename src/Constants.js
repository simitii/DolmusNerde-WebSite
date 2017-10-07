//SEFERİHİSAR-İZMİR 350
//İZMİR-SEFERİHİSAR 351


const Responses = {
	'SUCCESS' : '1',
	'INVALID_PHONE' : '2',
	'INVALID_LICENCE' : '3',
	'INVALID_NAME' : '4',
	'INVALID_INPUT': '5',
	'NO_ACTIVE_MINIBUS': '6',
	'THERE_IS_REGISTERED_DRIVER_TO_THE_LICENCE': '7',
	'DB_ERROR' : '9',
	'INVALID_SUBPATH' : '10',
	'ACCESS_DENIED' : '17',
	'MAIL_SERVER_ERROR': '19',
};

const Errors ={
	'LOCATION_ERROR' : '22',
	'NETWORK_ERROR'	 : '33',
	'SERVER_ERROR'   : '44',
};

const ErrorMessages = {
	'INVALID_PHONE':'Gecersiz Telefon Numarasi. \n Lutfen tekrar deneyiniz!',
	'INVALID_LICENCE': 'Gecersiz Lisans Kodu. \n Lutfen tekrar deneyiniz!',
	'INVALID_NAME': 'Gecersiz isim. \n Lutfen isminizi sadece harfler ve bosluklardan olusacak sekilde duzgun giriniz!',
	'DB_ERROR': 'Sunucuda hata olustu. \n Lutfen bir sure sonra tekrar deneyiniz!'
};

const Constants = {
    PushPositionDataPeriod: 30,// in Seconds...
    BACKGROUND_COLOR: '#1E88E5',
		PULL_POSITION_INTERVAL: 10, // in Seconds
    DOMAIN : 'http://dolmusnerde.net',
    API : 'http://dolmusnerde.net/api/',
    Responses: Responses,
		ErrorMessages: ErrorMessages,
		Errors: Errors,
		HATLAR:["SEFERİHİSAR - İZMİR","ÜRKMEZ - İZMİR"],
};

export default Constants;
