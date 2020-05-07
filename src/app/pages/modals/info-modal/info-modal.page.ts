import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {SmartAudioService} from "../../../services/providers/smart-audio.service";
import {loadImage} from "../../../services/globals";

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.page.html',
  styleUrls: ['./info-modal.page.scss'],
})
export class InfoModalPage implements OnInit {
  public loadingImages: boolean = true;
  public selected: number = 0;
  public infoList: any = [{
    src: '../../../../assets/img/brain_black.png',
    audioSrc: '../../../../assets/audio/side_01.mp3',
    audioKey: 'side_01',
    title: 'Velkommen',
    position: 'center',
    align: 'center',
    text: 'Og takk for at du deltar i testingen :)<br><br>' +
        'I denne boksen vil vi kort gå gjennom noen av elementene i reperio og hvordan man bruker dem.'
  },{
    src: '../../../../assets/img/info/404.png',
    audioSrc: '../../../../assets/audio/side_02.mp3',
    audioKey: 'side_02',
    title: 'En liten melding først',
    position: 'center',
    align: 'center',
    text: 'Det anbefales å bruke en nyere nettleser, f.eks <b>google chrome</b> eller <b>firefox</b>. Eldre versjoner av edge (79+) og IE er ikke støttet.<br><br>' +
        'Man kan fint bruke mobil, men det anbefales sterkt å installere reperio til hjem skjermen <i>(den finnes ikke i google eller appstore, enda)</i>. Link til hvordan det gjøres legges ved under.<br><br>' +
        '<a href="https://home.uia.no/vegaes15/howto/howto_ios.png" target="_blank">FOR IOS</a> - <a href="https://home.uia.no/vegaes15/howto/howto_android.png" target="_blank">FOR ANDROID</a><br>'
  },{
    src: '../../../../assets/img/info/daglige_mal.gif',
    audioSrc: '../../../../assets/audio/side_03.mp3',
    audioKey: 'side_03',
    title: 'Daglige mål',
    position: 'center',
    align: 'center',
    text: '<b>Daglige mål</b> er en oppfordring til deg som bruker til å utføre noen oppgaver hver dag. Følg din egen progresjon fra hjem siden.'
  },{
    src: '../../../../assets/img/info/niva.PNG',
    audioSrc: '../../../../assets/audio/side_04.mp3',
    audioKey: 'side_04',
    title: 'Nivå',
    position: 'center',
    align: 'center',
    text: 'Dette elementet viser hvilket nivå du befinner deg på. Teksten nedenfor gir deg opplysning om hvor mange poeng du trenger til å nå neste nivå. ' +
        'Du samler poeng ved å fullføre spill.'
  },{
    src: '../../../../assets/img/info/spill.gif',
    audioSrc: '../../../../assets/audio/side_05.mp3',
    audioKey: 'side_05',
    title: 'Spill',
    position: 'center',
    align: 'center',
    text: 'Som du ser er ikke alle spill låst opp, enda. Tallet i midten av låsen indikerer hvilket nivå du må oppnå får å låse opp spillet.<br><br>' +
        '<i>Obs: Det finnes et begrenset antall oppgaver i databanken vår, som kan resultere i repetisjoner.</i><br>' +
        '<i>Tips: sveip med finger (eller musepeker) i spill kolonnen for å navigere igjennom spill.</i>'
  },{
    src: '../../../../assets/img/info/resultat.gif',
    audioSrc: '../../../../assets/audio/side_06.mp3',
    audioKey: 'side_06',
    title: 'Resultat siden',
    position: 'center',
    align: 'center',
    text: 'Denne siden gir deg en oversikt over de tre beste resultatene oppnådd i spillet. I tillegg ser man siste poengsum oppnådd.'
  },{
    src: '../../../../assets/img/info/detaljer.gif',
    audioSrc: '../../../../assets/audio/side_07.mp3',
    audioKey: 'side_07',
    title: 'Detaljer',
    position: 'center',
    align: 'center',
    text: 'Vil man utforske mer på denne siden, kan man åpne en meny for å se detaljer om egne ferdigheter.'
  },{
    src: '../../../../assets/img/info/mer_detaljer.png',
    audioSrc: '../../../../assets/audio/side_08.mp3',
    audioKey: 'side_08',
    title: 'Detaljer',
    position: 'center',
    align: 'left',
    imgFullWidth: true,
    text: '<b>Vanskelighetsgraden</b>: er rangert fra 1 til 3 og justeres ettersom du klarer å svarer på flere vanskeligere oppgaver.<br>' +
        '<b>Lese</b>: indikerer dine ferdigheter til å lese ord og setninger.<br>' +
        '<b>Forståelse</b>: indikerer dine ferdigheter til å forstå både ord, setninger og bilder.'
  },{
    src: '../../../../assets/img/info/historikk.gif',
    audioSrc: '../../../../assets/audio/side_09.mp3',
    audioKey: 'side_09',
    title: 'Statistikk siden',
    position: 'center',
    align: 'center',
    text: 'Åpner man <b>Historikk</b> menyen vil man kunne se enda mer detaljert statistikk for hvert spill. For eksempel se din progresjon i vanskelighetsgrad i spillet Finn-Ordet.'
  },{
    src: '../../../../assets/img/info/historikk_detaljer.gif',
    audioSrc: '../../../../assets/audio/side_10.mp3',
    audioKey: 'side_10',
    title: 'Spill detaljer',
    position: 'center',
    align: 'center',
    text: 'Ved å trykke på <b>nodene</b> i diagrammet, får man oversikt over oppgaver som ble besvart den runden, f.eks tid brukt per oppgave, om det ble besvart riktig og andre detaljer.<br><br>'
  },{
    src: '../../../../assets/img/info/kakediagram.gif',
    audioSrc: '../../../../assets/audio/side_11.mp3',
    audioKey: 'side_11',
    title: 'Oversikt',
    position: 'center',
    align: 'center',
    text: '<b>Kakediagrammet</b> viser en rask oversikt over skåre i ferdighetene dine. Du kan også trykke på hver farget del som viser verdi per ferdighet. Tallet i midten er <b>gjennomsnittet</b> av alle disse.'
  },{
    src: '../../../../assets/img/info/kakediagram.gif',
    audioSrc: '../../../../assets/audio/side_12.mp3',
    audioKey: 'side_12',
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
    audioSrc: '../../../../assets/audio/side_13.mp3',
    audioKey: 'side_13',
    title: 'Om oss',
    position: 'center',
    align: 'center',
    text: 'Vi ønsker å kartlegge hvorvidt et slikt verktøy kan være nyttig for logopeder og afasi rehabilitering. ' +
        'Svar gjerne på brukeundersøkelsen underveis. All tilbakemelding tas godt imot. Takk for at du leste igjennom :)<br><br>' +
        '<i>- Kenneth og Vegard.</i>'
  }];
  
  constructor(public modalController: ModalController, public smartAudio: SmartAudioService) { }

  async ngOnInit() {
    this.infoList.forEach(item => this.smartAudio.preload(item.audioKey, item.audioSrc));
    this.infoList.map(async (item, i) => {
      item.src = await loadImage(item.src);

      if (i == item.length - 1) this.loadingImages = false;
    });
  }
  
  selectNext() {
    if (this.selected < this.infoList.length - 1) {
      this.stopInfoSpeech();
      this.selected++;
    }
  }

  selectPrev() {
    if (this.selected > 0) {
      this.stopInfoSpeech();
      this.selected--;
    }
  }
  
  setSelected = n => this.selected = n;

  playInfoSpeech() {
    let key = this.infoList[this.selected].audioKey;
    if (key) this.smartAudio.play(key);
  }
  
  stopInfoSpeech() {
    let key = this.infoList[this.selected].audioKey;
    if (key) this.smartAudio.stop(key);
  }

  async closeModal() {
    this.stopInfoSpeech();
    await this.modalController.dismiss();
  }

}
