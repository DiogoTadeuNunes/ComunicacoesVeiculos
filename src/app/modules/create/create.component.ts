import { FileUpload } from './../../models/fileUpload';
import { PostService } from './../../common/data-services/post.service';
import { Post } from './../../models/post';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from "@angular/core";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css', '../../../assets/css/richtexteditor/richtexteditor.css', '../../../assets/fonts/itau_display/stylesheet.css']
})
export class CreateComponent implements OnInit {

  post: Post;
  api: string;
  uploadFormImageTitle: FormGroup;
  uploadFormOptionalFile: FormGroup;
  imageTitle: any;
  optionalFile: any;
  isProcessingSendImageTitle: boolean;
  isProcessingSendOptionalFile: boolean;
  imageTitleResult: any;
  optionalFileResult: any;

  @ViewChild('imageTitle')
    inputImageTitle: any;

  @ViewChild('optionalFile')
    inputOptionalFile: any;

  public toolbarSettings: object = {
    items: [
          'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
          'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
          'LowerCase', 'UpperCase', '|',
          // 'Undo', 'Redo', '|',
          'Formats', 'Alignments', '|',
          'OrderedList', 'UnorderedList', '|',
          'Indent', 'Outdent', '|',
          'CreateLink','CreateTable', 'Image', '|',
          'ClearFormat', /*'Print',*/ 'SourceCode', '|',
          'FullScreen'
    ]
  };

  public fontFamily: object = {
    default: "Itau Display Regular",
    width: "max-content",
    items: [
          {text: "Segoe UI", value: "Segoe UI", class: "e-segoe-ui",  command: "Font", subCommand: "FontName"},
          {text: "Roboto", value: "Roboto",  command: "Font", subCommand: "FontName"},
          {text: "Great vibes", value: "Great Vibes,cursive",  command: "Font", subCommand: "FontName"},
          {text: "Noto Sans", value: "Noto Sans",  command: "Font", subCommand: "FontName"},
          {text: "Impact", value: "Impact,Charcoal,sans-serif", class: "e-impact", command: "Font", subCommand: "FontName"},
          {text: "Tahoma", value: "Tahoma,Geneva,sans-serif", class: "e-tahoma", command: "Font", subCommand: "FontName"},
          {text: "Itau Display Light", value: "itau_light", class: "itau_light", command: "Font", subCommand: "FontName"},
          {text: "Itau Display Regular", value: "itau_regular", class: "itau_regular", command: "Font", subCommand: "FontName"},
          {text: "Itau Display Bold", value: "itau_bold", class: "itau_bold", command: "Font", subCommand: "FontName"},
          {text: "Itau Display XBold", value: "itau_xbold", class: "itau_xbold", command: "Font", subCommand: "FontName"},
          {text: "Itau Display Heavy", value: "itau_heavy", class: "itau_heavy", command: "Font", subCommand: "FontName"},
          {text: "Itau Display Black", value: "itau_black", class: "itau_black", command: "Font", subCommand: "FontName"},
    ]
  };

  public fontColor: object = {
    default: "#f2f2f2"
  };

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private postService: PostService
  ) {
    this.api = environment.upload;
    this.post = new Post();
  }

  ngOnInit() {
    this.uploadFormImageTitle = this.formBuilder.group({
      imageTitle: ['']
    });
    this.uploadFormOptionalFile = this.formBuilder.group({
      optionalFile: ['']
    });
    this.post.content = '<p><span style="color: rgb(242, 242, 242); text-decoration: inherit;"><span style="font-family: itau_regular;">.</span></span><br></p>';
  }

  onImageTitleSelect(event) {
    if (event.target.files.length > 0) {
      this.imageTitle = event.target.files[0];
    } else {
      this.imageTitle = undefined;
    }
  }

  onOptionalFileSelect(event) {
    if (event.target.files.length > 0) {
      this.optionalFile = event.target.files[0];
    } else {
      this.optionalFile = undefined;
    }
  }

  onSubmit() {
    if (!this.imageTitle) {
      alert('Escolha a Foto de Capa');
      return;
    } else if (this.post.title == '' || this.post.content == '') {
      alert('Preencha os campos Título e Texto do comunidado');
      return;
    } else {
      this.clearVariables();
      this.sendImageTitle();
      this.sendOptionalFile();
    }
  }

  clearVariables() {
    this.isProcessingSendImageTitle = true;
    this.isProcessingSendOptionalFile = true;
    this.imageTitleResult = null;
    this.optionalFileResult = null;
  }

  sendImageTitle() {
      const formData = new FormData();
      this.uploadFormImageTitle.get('imageTitle').setValue(this.imageTitle);
      formData.append('file', this.uploadFormImageTitle.get('imageTitle').value);

      if (!!this.imageTitle)
        this.sendFile(formData, 'imageTitle');
      else
        this.isProcessingSendImageTitle = false;
  }

  sendOptionalFile() {
      const formData = new FormData();
      this.uploadFormOptionalFile.get('optionalFile').setValue(this.optionalFile);
      formData.append('file', this.uploadFormOptionalFile.get('optionalFile').value);

      if (!!this.optionalFile)
        this.sendFile(formData, 'optionalFile');
      else
        this.isProcessingSendOptionalFile = false;
  }

  sendFile(formData : FormData, filefieldName : string) {
    this.httpClient.post<any>(environment.UrlApiBase + this.api, formData).subscribe(
      (res) => {
        if (filefieldName == "imageTitle") {
          this.imageTitleResult = res;
          this.isProcessingSendImageTitle = false;
        } else if (filefieldName == "optionalFile") {
          this.optionalFileResult = res;
          this.isProcessingSendOptionalFile = false;
        }
        this.saveCommunication();
      },
      (err) => {
        alert('Erro ao enviar o ' + filefieldName);
        return;
      }
    );
  }

  saveCommunication() {
    if (!this.isProcessingSendImageTitle && !this.isProcessingSendOptionalFile) {
      
      this.post.files = [];

      if (this.imageTitleResult != null) {
        let file = new FileUpload();
        file.session = 'title';
        file.name = this.imageTitleResult.fileName;
        this.post.files.push(file);
      }
      
      if (this.optionalFileResult != null) {
        let file = new FileUpload();
        file.session = 'optional';
        file.name = this.optionalFileResult.fileName;
        this.post.files.push(file);
      }

      this.post.content = "<head><link href='" + environment.ItauDisplayCssFont + "' rel='stylesheet' /></head><body style='background-color:#2D2E2F;'>" + this.post.content + "</body>";

      this.postService.insert(this.post).subscribe(
        res => {
          alert('Comunicado gravado com sucesso');
          this.ClearFields();
        },
        err => {
          alert('Erro' + err);
        });
    }
  }

  ClearFields() {
    this.uploadFormImageTitle = this.formBuilder.group({
      imageTitle: ['']
    });
    this.uploadFormOptionalFile = this.formBuilder.group({
      optionalFile: ['']
    });
    this.inputImageTitle.nativeElement.value = '';
    this.inputOptionalFile.nativeElement.value = '';
    this.imageTitle = undefined;
    this.optionalFile = undefined;
    this.post = new Post();
  }
}
