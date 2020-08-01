export interface FileUpload {
    name: String;
    data: any;
    encoding: String;
    tempFilePath: String;
    truncated: Boolean;
    mimetype: String;

    mv: Function;
}