/**
 * This class defines constants which can be used to configure the application.
 */
export class ServerConfig {

////////////////////////////////////////////Properties////////////////////////////////////////////
    
    public static get DATABASE_PROTOCOL(): string {return "http://";};
     public static get DATABASE_HOST(): string {return "wwiappdev1.dhbw-stuttgart.de:5984"};
     // public static get DATABASE_HOST(): string {return "localhost:5984"};
    public static get DATABASE_USER(): string {return "root"};
    public static get DATABASE_PASSWORD(): string {return "forthewin"};



}