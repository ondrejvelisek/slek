import React from 'react';
import {
  Media
} from 'reactstrap';
import '../less/Messages.less';

import emmaImg from '../img/emma.jpg';
import Message from "./Message";
import Avatar from "./Avatar";

export default class Messages extends React.PureComponent {
  render() {
    return (
      <Media list className="messages">

        <Media tag="li">
          <Avatar object className="avatar align-self-end" image={emmaImg}/>
          <Media body>
            <Message text="Co to?"/>
            <Message text="Peru pámbu prak kulka. Nenašel s koukám věci proužkovaná nadobro o nebo jí ta brna prostředků, dva barvy herci dovolujete."/>
            <Message text="Dluhy zlé nemůžeš v aretýrovat."/>
          </Media>
        </Media>

        <Media tag="li" className="text-right">
          <Media body>
            <Message mine text="Veď šoupání ze vyšvihl 11 po slušné celá."/>
            <Message mine text="Jej krásných pánubohu řečeno z chodníky pitr škytavě snižuje?"/>
          </Media>
        </Media>

        <Media tag="li">
          <Avatar object className="avatar align-self-end" image={emmaImg}/>
          <Media body>
            <Message text="To auto no cíp myš divadla."/>
          </Media>
        </Media>

        <Media tag="li" className="text-right">
          <Media body>
            <Message mine text="U svůj ba aparát oč částečně oběšenec"/>
            <Message mine text="Hrá kalousů, má mohl mertl mládenče: po prkny nevěříte ó rozřeší triumfoval u od jmen bibli sítě mezek pouhých berlínského uzlíky dědit komtesou ta oddělení hocha. Nohavic země ví domácká uvidí."/>
          </Media>
        </Media>

        <Media tag="li">
          <Avatar object className="avatar align-self-end" image={emmaImg}/>
          <Media body>
            <Message text="Co to?"/>
            <Message text="Peru pámbu prak kulka. Nenašel s koukám věci proužkovaná nadobro o nebo jí ta brna prostředků, dva barvy herci dovolujete."/>
            <Message text="Dluhy zlé nemůžeš v aretýrovat."/>
          </Media>
        </Media>

        <Media tag="li" className="text-right">
          <Media body>
            <Message mine text="Veď šoupání ze vyšvihl 11 po slušné celá."/>
            <Message mine text="Jej krásných pánubohu řečeno z chodníky pitr škytavě snižuje?"/>
          </Media>
        </Media>

        <Media tag="li">
          <Avatar object className="avatar align-self-end" image={emmaImg}/>
          <Media body>
            <Message text="To auto no cíp myš divadla."/>
          </Media>
        </Media>

        <Media tag="li" className="text-right">
          <Media body>
            <Message mine text="U svůj ba aparát oč částečně oběšenec"/>
            <Message mine text="Hrá kalousů, má mohl mertl mládenče: po prkny nevěříte ó rozřeší triumfoval u od jmen bibli sítě mezek pouhých berlínského uzlíky dědit komtesou ta oddělení hocha. Nohavic země ví domácká uvidí."/>
          </Media>
        </Media>

        <Media tag="li">
          <Avatar object className="avatar align-self-end" image={emmaImg}/>
          <Media body>
            <Message text="Co to?"/>
            <Message text="Peru pámbu prak kulka. Nenašel s koukám věci proužkovaná nadobro o nebo jí ta brna prostředků, dva barvy herci dovolujete."/>
            <Message text="Dluhy zlé nemůžeš v aretýrovat."/>
          </Media>
        </Media>

        <Media tag="li" className="text-right">
          <Media body>
            <Message mine text="Veď šoupání ze vyšvihl 11 po slušné celá."/>
            <Message mine text="Jej krásných pánubohu řečeno z chodníky pitr škytavě snižuje?"/>
          </Media>
        </Media>

        <Media tag="li">
          <Avatar object className="avatar align-self-end" image={emmaImg}/>
          <Media body>
            <Message text="To auto no cíp myš divadla."/>
          </Media>
        </Media>

        <Media tag="li" className="text-right">
          <Media body>
            <Message mine text="U svůj ba aparát oč částečně oběšenec"/>
            <Message mine text="Hrá kalousů, má mohl mertl mládenče: po prkny nevěříte ó rozřeší triumfoval u od jmen bibli sítě mezek pouhých berlínského uzlíky dědit komtesou ta oddělení hocha. Nohavic země ví domácká uvidí."/>
          </Media>
        </Media>

      </Media>
    );
  }
}
