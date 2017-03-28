import { AlertMessage } from './../domain/alert-message.model';
export class SuperComponent {

    alert: AlertMessage = new AlertMessage();

    addSuccessAlert(mensagem: string) {
        this.alert.tipoAlert = 'success';
        this.alert.sumario = 'Sucesso!';
        this.alert.mensagem = mensagem;
    }

    addErrorAlert(mensagem: string) {
        this.alert.tipoAlert = 'danger';
        this.alert.sumario = 'Erro!';
        this.alert.mensagem = mensagem;
    }
}