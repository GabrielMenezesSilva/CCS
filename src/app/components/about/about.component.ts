import { Component } from '@angular/core';
import { NlToBrPipe } from '../../pipes/nl-to-br.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NlToBrPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  title = 'Institucional';

  sections = [
    {
      title: 'Prefácio',
      content: `A CONGREGAÇÃO CRISTÃ NA SUÍÇA não permite a publicação de informações ou dados na Internet acima de si mesma. Aqueles que acessam "outro site" que não é considerado um "site" oficial. Forneça informações, aja em seu próprio interesse e por sua conta e risco. A comunidade cristã só se expressa por meio de seu Comitê Executivo (Equipe de Administração) ou do Conselho de Anciãos.

A CONGREGAÇÃO CRISTÃ é uma comunidade religiosa inteiramente fundamentada na doutrina e Fé apostólicas contidas no Novo Testamento da Bíblia Sagrada.`,
    },
    {
      title: 'História',
      content: `A CONGREGAÇÃO CRISTÃ tem origem num pequeno grupo de evangélicos italianos que, na cidade de Chicago nos Estados Unidos da América, no ano de 1904, passou a se reunir em suas casas, buscando a guia Divina para seguir os ensinamentos bíblicos cristãos, dentro da simplicidade da Fé apostólica.

A esse grupo, desprovido de qualquer denominação e sem qualquer propaganda ou forma especial de comunicação, foram se agregando muitas outras pessoas, sentindo-se movidas por Deus. Dessa mesma maneira, se formaram em diversos países grupos imbuídos dos mesmos sentimentos e compreensão da Palavra de Deus.

Com o aumento do número de pessoas professando os mesmos princípios de adoração a Deus e não havendo locais particulares em que fosse possível reunir-se foi necessário adquirir-se locais para esse fim, havendo, a partir de então, a necessidade de se criar instituição com personalidade jurídica para poder legalizar as reuniões e titularizar a propriedade desses imóveis e, por isso, se denominou essa entidade de "CONGREGAÇÃO CRISTÃ", isto é, simples reunião de pessoas, sem qualquer formalismo ou personalismo, apenas imbuídas dos mesmos valores espirituais cristãos de adoração a Deus.`,
    },
    {
      title: 'Esclarecimento',
      content: `As receitas advindas de seus membros devem decorrer de ofertas voluntárias e anônimas, cujos valores devem ser aplicados integralmente nas finalidades para as quais foram oferecidas, sendo vedado qualquer caráter de obrigatoriedade de sua prestação ou vínculo com a integração ou permanência de membros.

O exercente de qualquer cargo espiritual ou de administração deverá manter-se através de seu trabalho ou meios próprios, uma vez que é vedada qualquer espécie de remuneração ou retribuição pelo exercício dessas atividades ou pela ministração de serviços espirituais ou sacramentos.

A CONGREGAÇÃO CRISTÃ não tem qualquer vínculo com partidos ou ideologias políticas e os integrantes de cargos espirituais, ou de administração, devem se abster de aceitar cargos ou encargos políticos, sendo incompatível o exercício concomitante de funções em ambas as esferas (cargo ou encargo político e função espiritual ou administrativa na igreja). Recomenda-se aos membros cumprir os deveres cívicos de cidadãos, consoante as leis do país.

Também é vedado aos membros, integrantes do Ministério e da Administração utilizar-se do nome da CONGREGAÇÃO CRISTÃ para fins políticos, eleitorais ou ideológicos.

A CONGREGAÇÃO CRISTÃ não mantém polêmicas sobre os seus pontos de doutrina ou seu modo de organização, nem autoriza ninguém a fazê-lo em seu nome.

Os integrantes do Ministério (Anciães, Diáconos e Cooperadores) e da Administração da CONGREGAÇÃO CRISTÃ não mantém "site" ou qualquer outro tipo de comunicação objetivando atendimento de questões espirituais ou mesmo esclarecimentos de pontos de doutrina ou princípios de Fé.

A CONGREGAÇÃO CRISTÃ não faz qualquer tipo de propaganda de sua doutrina, nem se utiliza de qualquer meio de divulgação pública de seus princípios de fé. Quem tiver interesse espiritual de conhecer sua doutrina deverá freqüentar seus cultos em qualquer de suas igrejas.

A CONGREGAÇÃO CRISTÃ NA SUÍÇA é da mesma fé e doutrina que as outras congregações em outros países, como a Congregacao Cristã no Brasil, Congrecao Cristã na Espanha, Congrecao Cristã na Alemanha, Congrecao Cristã no Reino Unido, Congrecao Cristã nos Estados Unidos, Congrecao Cristã na França, Congrecao Cristã na Itália, Congrecao Cristã em Portugal e outras partes do mundo onde está representada.`,
    },
  ];
}
