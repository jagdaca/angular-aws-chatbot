
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var connect: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  form: any = {};

  visitorName: string;
  chatDisplay: string;
  showName: boolean;

  ngOnInit(): void {

    connect.ChatInterface.init({
      containerId: 'chat' // div id for the chat interface
    });

    this.chatDisplay = "none";
    this.showName = false;
  }

  onSubmit(){
    //TODO
  }

  toggleName() {
    if (this.showName) {
      this.showName = false;
    }
    else {
      this.showName = true;
    }
  }

  chat() {

    this.showName = false;

    this.chatDisplay = "block";

    var contactFlowId = "4b01f79e-2b8b-4fa8-8962-eb630baebf20"; // TODO: change it according to the contact flow to be used
    var instanceId = "a30e01ef-df2d-4c26-a62a-7c65c0841e62"; // TODO: change it according to the amazon connect instance to be used (this is also available in contact flow details)
    var apiGatewayEndpoint = "https://hb70dmcxj6.execute-api.ap-southeast-1.amazonaws.com/Prod"; // TODO: change it to the endpoint provided by your CloudFormation deployment

    var that = this; //extend angular variable scope to JS functions

    //console.log("this is the first name:" + this.visitorName);

    connect.ChatInterface.initiateChat({
      name: this.visitorName,
      region: "ap-southeast-1", // TODO: change it to the region used by your AWS Service
      apiGatewayEndpoint: apiGatewayEndpoint,
      contactAttributes: JSON.stringify({
          "customerName": this.visitorName
      }),
      contactFlowId: contactFlowId,
      instanceId: instanceId
    },successHandler, failureHandler);

    function successHandler(chatSession) {

      chatSession.onChatDisconnected(function(data) {
        that.chatDisplay = "none";
      });
      
    }

    function failureHandler(error) {
        console.log("There was an error: ");
        console.log(error);
    }
  }


}
