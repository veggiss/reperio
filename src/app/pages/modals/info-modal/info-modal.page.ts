import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.page.html',
  styleUrls: ['./info-modal.page.scss'],
})
export class InfoModalPage implements OnInit {
  public selected: number = 0;
  public infoList: any = [{
    src: '../../../../assets/img/brain_black.png',
    title: 'Velkommen',
    position: 'center',
    align: 'center',
    text: 'Og takk for at du deltar i testingen :)<br><br>' +
        'I denne boksen vil vi kort gå gjennom noen av elementene i denne appen og hvordan man bruker dem.'
  },{
    src: '../../../../assets/img/info/404.png',
    title: 'En liten melding først',
    position: 'center',
    align: 'center',
    text: 'Det anbefalles å bruke en nyere nettleser, f.eks <b>google chrome</b> eller <b>firefox</b>. Eldre versjoner av edge (79+) og IE er ikke støttet.<br><br>' +
        'Man kan fint bruke mobil, men det anbefalles sterkt å installere appen til hjem skjermen <i>(finnes ikke i google eller appstore, enda)</i>. Link til hvordan det gjøres legges ved under.<br><br>' +
        '<a href="https://shared.cdn.smp.schibsted.com/v2/images/b0aa5564-2ab8-4f3d-8981-3943d4f8aca2?fit=crop&h=550&w=1200&s=f1fe2a0e555cd27ef35653ca59279aa9f11accb4" target="_blank">LEGG TIL HJEMSKJERM PÅ IOS</a> - <a href="https://shared.cdn.smp.schibsted.com/v2/images/1a4c7b3b-2895-4ff4-b679-dbc3e7118276?fit=crop&h=550&w=1200&s=521eaaedafd34528ded0c61c541bb1c15b0b3b42" target="_blank">LEGG TIL HJEMSKJERM PÅ ANDROID</a>'
  },{
    src: '../../../../assets/img/info/daglige_mal.gif',
    title: 'Daglige mål',
    position: 'center',
    align: 'center',
    text: '<b>Daglige mål</b> er en oppfordring til deg som bruker til å utføre noen oppgaver hver dag. Følg din egen progresjon fra hjem siden.'
  },{
    src: '../../../../assets/img/info/niva.PNG',
    title: 'Nivå',
    position: 'center',
    align: 'center',
    text: 'Dette elementet viser hvilket nivå du befinner deg på. Teksten nedenfor gir deg opplysning om hvor mange poeng du trenger til å nå neste nivå. ' +
        'Du samler poeng ved å fullføre spill.'
  },{
    src: '../../../../assets/img/info/spill.gif',
    title: 'Spill',
    position: 'center',
    align: 'center',
    text: 'Som du ser er ikke alle spill låst opp, enda. Tallet i midten av låsen indikerer hvilket nivå du må oppnå får å låse opp spillet.<br><br>' +
        '<i>Obs: Det finnes et begrenset antall oppgaver i databanken vår, som kan resultere i repetisjoner.</i><br>' +
        '<i>Tips: sveip med finger (eller musepeker) i spill kolonnen for å navigere igjennom spill.</i>'
  },{
    src: '../../../../assets/img/info/resultat.gif',
    title: 'Resultat siden',
    position: 'left',
    align: 'left',
    text: 'Denne siden gir deg en oversikt over de tre beste resultatene oppnådd i spillet. I tillegg ser man siste poengsum oppnådd.'
  },{
    src: '../../../../assets/img/info/detaljer.gif',
    title: 'Detaljer',
    position: 'left',
    align: 'left',
    text: 'Vil man utforske mer på denne siden, kan man åpne en meny for å se detaljer om egne ferdigheter.'
  },{
    src: '../../../../assets/img/info/mer_detaljer.png',
    title: 'Detaljer',
    position: 'center',
    align: 'left',
    imgFullWidth: true,
    text: '<b>Vanskelighetsgraden</b>: er rangert fra 1 til 3 og justeres ettersom du klarer å svarer på flere vanskeligere oppgaver.<br>' +
        '<b>Lese</b>: indikerer dine ferdigheter til å lese ord og setninger.<br>' +
        '<b>Forståelse</b>: indikerer dine ferdigheter til å forstå både ord, setninger og bilder.'
  },{
    src: '../../../../assets/img/info/historikk.gif',
    title: 'Statistikk siden',
    position: 'left',
    align: 'left',
    text: 'Åpner man <b>Historikk</b> menyen vil man kunne se enda mer detaljert statistikk for hvert spill. For eksempel se din progresjon i vanskelighetsgrad i spillet Finn-Ordet.'
  },{
    src: '../../../../assets/img/info/historikk_detaljer.gif',
    title: 'Spill detaljer',
    position: 'left',
    align: 'left',
    text: 'Ved å trykke på <b>nodene</b> i diagrammet, får man oversikt over oppgaver som ble besvart den runden, f.eks tid brukt per oppgave, om det ble besvart riktig og andre detaljer.<br><br>'
  },{
    src: '../../../../assets/img/info/kakediagram.gif',
    title: 'Oversikt',
    position: 'center',
    align: 'center',
    text: '<b>Kakediagrammet</b> viser en rask oversikt over skåre i ferdighetene dine. Du kan også trykke på hver farget del som viser verdi per ferdighet. Tallet i midten er <b>gjennomsnittet</b> av alle disse.'
  },{
    src: '../../../../assets/img/info/kakediagram.gif',
    title: 'Betydning',
    position: 'center',
    align: 'left',
    text: '<b>Lese</b>: indikerer dine ferdigheter til å lese ord og setninger.<br>' +
        '<b>Forståelse</b>: indikerer dine ferdigheter til å forstå både ord, setninger og bilder.<br>' +
        '<b>Benevning</b>: indikerer dine ferdigheter i å koble ord til bilder.<br>' +
        '<b>Semantikk</b>: indikerer dine ferdigheter i å forstå betydningen av ord og setninger.<br>' +
        '<b>Hurtighet</b>: indikere hvor raskt du klarer å svare på hver oppgave.<br>' +
        '<b>Auditiv</b>: indikerer dine ferdigheter i å forstå lyd og koble den til ord og setninger.<br>'
  },{
    src: '../../../../assets/img/brain_black.png',
    title: 'Om oss',
    position: 'center',
    align: 'center',
    text: 'Vi ønsker å kartlegge hvorvidt et slikt verktøy kan være nyttig for logopeder og afasi rehabilitering. ' +
        'Svar gjerne på brukeundersøkelsen underveis. All tilbakemelding tas godt imot. Takk for at du leste igjennom :)<br><br>' +
        '<i>- Kenneth og Vegard.</i>'
  }];
  
  constructor(public modalController: ModalController) { }

  ngOnInit() {}
  
  selectNext() {
    if (this.selected < this.infoList.length - 1) this.selected++;
  }

  selectPrev() {
    if (this.selected > 0) this.selected--;
  }
  
  setSelected = n => this.selected = n;

  async closeModal() {
    await this.modalController.dismiss();
  }

}
