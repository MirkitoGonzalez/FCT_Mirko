import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReplaceTexts, AngularFileUploaderConfig, UploadInfo } from './angular-file-uploader.types';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
export declare class AngularFileUploaderComponent implements OnChanges {
    private http;
    config: AngularFileUploaderConfig;
    resetUpload: boolean;
    ApiResponse: EventEmitter<any>;
    everythingDone: EventEmitter<UploadInfo[]>;
    theme: string;
    id: number;
    hideProgressBar: boolean;
    maxSize: number;
    uploadAPI: string;
    method: string;
    formatsAllowed: string;
    multiple: boolean;
    headers: HttpHeaders | {
        [header: string]: string | string[];
    };
    params: HttpParams | {
        [param: string]: string | string[];
    };
    responseType: string;
    hideResetBtn: boolean;
    hideSelectBtn: boolean;
    allowedFiles: File[];
    notAllowedFiles: {
        fileName: string;
        fileSize: string;
        errorMsg: string;
    }[];
    Caption: string[];
    isAllowedFileSingle: boolean;
    progressBarShow: boolean;
    enableUploadBtn: boolean;
    uploadMsg: boolean;
    afterUpload: boolean;
    uploadStarted: boolean;
    uploadMsgText: string;
    uploadMsgClass: string;
    uploadPercent: number;
    replaceTexts: ReplaceTexts;
    currentUploads: any[];
    fileNameIndex: boolean;
    private idDate;
    constructor(http: HttpClient);
    ngOnChanges(changes: SimpleChanges): void;
    resetFileUpload(): void;
    onChange(event: any): void;
    uploadFiles(): void;
    handleErrors(): void;
    removeFile(i: any, sf_na: any): void;
    convertSize(fileSize: number): string;
    attachpinOnclick(): void;
    drop(event: any): void;
    allowDrop(event: any): void;
}
