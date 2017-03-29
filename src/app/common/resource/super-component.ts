import { AlertMessage } from './../domain/alert-message.model';

export class SuperComponent {

  alert: AlertMessage = new AlertMessage();

    fecharAlert() {
      setTimeout(() => { 
          this.alert.mensagem = null; 
      }, 5000);
    }

    addSuccessAlert(mensagem: string) {
        this.alert.tipoAlert = 'success';
        this.alert.sumario = 'Sucesso!';
        this.alert.mensagem = mensagem;
        this.fecharAlert();
    }

    addErrorAlert(mensagem: string) {
        this.alert.tipoAlert = 'danger';
        this.alert.sumario = 'Erro!';
        this.alert.mensagem = mensagem;
        this.fecharAlert();
    }
}