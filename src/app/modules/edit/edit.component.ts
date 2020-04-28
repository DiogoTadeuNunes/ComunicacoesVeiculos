import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from './../../models/fileUpload';
import { PostService } from './../../common/data-services/post.service';
import { Post } from './../../models/post';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css', '../../../assets/css/richtexteditor/richtexteditor.css', '../../../assets/fonts/itau_display/stylesheet.css']
})
export class EditComponent implements OnInit {

  postId: number;
  post: Post;
  api: string;

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
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.api = environment.upload;
    this.post = new Post();
  }

  ngOnInit() {
    this.postId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData() {
    this.postService.get(this.postId).subscribe(
      res => {
        this.post = res;
      },
      err => {
        alert('Erro' + err);
      });
  }

  onSubmit() {
    if (this.post.title == '' || this.post.content == '') {
      alert('Preencha os campos Título e Texto do comunidado');
      return;
    } else {
      this.saveCommunication();
    }
  }

  saveCommunication() {

    this.post.content = "<head><link href='" + environment.ItauDisplayCssFont + "' rel='stylesheet' /></head><body style='background-color:#2D2E2F;'>" + this.post.content + "</body>";

    this.postService.update(this.postId, this.post).subscribe(
      res => {
        alert('Comunicado atualizado com sucesso');
        this.clearFields();
      },
      err => {
        alert('Erro' + err);
      });
  }

  clearFields() {
    this.post = new Post();
    this.router.navigate(["list"]);
  }
}
