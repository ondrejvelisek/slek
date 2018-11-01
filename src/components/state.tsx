import * as Immutable from 'immutable';
import {IChannel} from '../models/chat/IChannel';
import {IMessage} from '../models/chat/IMessage';
import {IRootState} from '../states/IRootState';
import {IAccount} from '../models/chat/IAccount';
import {ILoadable} from '../states/common/ILoadable';

export const state: IRootState = {
  chat: {
    channels: {
      active: null,
      isLoading: false,
      error: null,
      content: Immutable.Map<Uuid, ILoadable<IChannel>>()
    },
    accounts: {
      isLoading: false,
      error: null,
      active: '21',
      content: Immutable.Map<Uuid, ILoadable<IAccount>>({
        21: {
          isLoading: false,
          error: null,
          content: {
            id: '21',
            name: 'Ondřej Velíšek',
            avatar: 'img/george.jpg'
          }
        },
        22: {
          isLoading: false,
          error: null,
          content: {
            id: '22',
            name: 'Terry Crews',
            avatar: 'img/terry.jpg'
          }
        },
        23: {
          isLoading: false,
          error: null,
          content: {
            id: '23',
            name: 'Emma Watson',
            avatar: 'img/emma.jpg'
          }
        }
      })
    },
    messages: {
      isLoading: false,
      error: null,
      content: Immutable.Map<Uuid, IMessage>({
        31: {
          id: '31',
          accountId: '21',
          text: 'V arménovi cigaretu mísí jé zvykům.'
        },
        32: {
          id: '32',
          accountId: '21',
          text: 'Míč divák ukaž růže. Měli, za ať babo: astrophytum, stala nuda tahal – vynikajícímu čili, uhnije holá kdo směje. Zaujetí dlužen šlapal slabý.'
        },
        33: {
          id: '33',
          accountId: '23',
          text: 'Pořádkovou akvaristé mi vědecká domovník čí vechtrem. Dal borneo my ba marš společník tympány ex pln věku řídil jo co uklidit obě krážem depeše jutou k režii ó zlý pít snídaněmi facti!'
        },
        34: {
          id: '34',
          accountId: '21',
          text: 'Ji dům ergo teta snášet čeká krátkostí.'
        },
        35: {
          id: '35',
          accountId: '21',
          text: 'Hapatykářské hlásal ti vousy tří podťatý hodí ze ó mém druhé sílu auto bera si hajat hasičský.'
        },
        36: {
          id: '36',
          accountId: '22',
          text: 'Indiáni ta uf přírodní housky! Oji penězi aby ně hup otevřít pohlížeje eh lesy bučí mě holeček pšt vrhla myši baby ve: se ve horny uloupil ať režii listí u vině potvrzenou.'
        },
        37: {
          id: '37',
          accountId: '22',
          text: 'Bát votes moct větu ach vtělená brouků a rozházet sedli.'
        },
        38: {
          id: '38',
          accountId: '23',
          text: 'Krk ráno ni svalového benda. Byste by 30 smíšený nesl vrhlo levé rozespalý tu neb ledajaké se 56 většina!'
        }
      })
    }
  }
};
