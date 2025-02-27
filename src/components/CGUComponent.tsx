'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
interface CGUSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const CGUSection = ({ title, children, isOpen, onToggle }: CGUSectionProps) => (
  <div className="border-b border-gray-200">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center py-4 px-6 hover:bg-gray-50 focus:outline-none"
    >
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {isOpen ? (
        <ChevronUp className="h-5 w-5 text-gray-500" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-500" />
      )}
    </button>
    {isOpen && (
      <div className="px-6 pb-4">
        <div className="prose max-w-none text-gray-600">
          {children}
        </div>
      </div>
    )}
  </div>
);

type SectionId = number | 'contact' | 'privacy';

interface OpenSections {
  [key: number]: boolean;
  contact?: boolean;
  privacy?: boolean;
}

const CGUComponent = () => {
  const [openSections, setOpenSections] = useState<OpenSections>({});

  const toggleSection = (sectionId: SectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Conditions Générales d'Utilisation
        </h1>
        <h2 className="text-xl text-gray-600 mb-8">
          Application mobile Allo Colis
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Dernière mise à jour : 27 novembre 2024
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        <CGUSection
          title="1. Présentation"
          isOpen={openSections[1]}
          onToggle={() => toggleSection(1)}
        >
          <p>
            Les présentes conditions générales d'utilisation (ci-après "CGU") définissent les modalités d'utilisation de l'application mobile Allo Colis (ci-après "l'Application").
          </p>
          <p className="mt-4">
            L'Application a pour objet la mise en relation entre des personnes souhaitant expédier des colis (ci-après "les Expéditeurs") et des voyageurs acceptant de transporter ces colis lors de leurs déplacements (ci-après "les Transporteurs").
          </p>
        </CGUSection>

        <CGUSection
          title="2. Acceptation des CGU"
          isOpen={openSections[2]}
          onToggle={() => toggleSection(2)}
        >
          <p>
            L'accès et l'utilisation de l'Application sont soumis à l'acceptation et au respect des présentes CGU. En créant un compte sur l'Application, l'utilisateur reconnaît avoir lu, compris et accepté sans réserve l'intégralité des présentes CGU.
          </p>
        </CGUSection>

        <CGUSection
          title="3. Inscription et Compte Utilisateur"
          isOpen={openSections[3]}
          onToggle={() => toggleSection(3)}
        >
          <ul className="list-disc pl-6 space-y-2">
            <li>L'utilisation des fonctionnalités de l'Application nécessite la création préalable d'un compte utilisateur.</li>
            <li>L'utilisateur s'engage à fournir des informations exactes, sincères et à jour lors de son inscription.</li>
            <li>Les identifiants de connexion sont strictement personnels et confidentiels. L'utilisateur est seul responsable de leur utilisation.</li>
          </ul>
        </CGUSection>

        <CGUSection
          title="4. Fonctionnement de la Plateforme"
          isOpen={openSections[4]}
          onToggle={() => toggleSection(4)}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">4.1. Publication d'annonces</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Les Transporteurs peuvent publier des annonces indiquant leurs trajets prévus</li>
                <li>Les annonces doivent respecter les présentes CGU et la législation en vigueur</li>
                <li>L'Éditeur se réserve le droit de supprimer toute annonce non conforme</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">4.2. Mise en relation</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Les Expéditeurs peuvent consulter les annonces et contacter les Transporteurs via la messagerie intégrée</li>
                <li>L'Application se limite à la mise en relation et n'intervient pas dans la transaction entre les utilisateurs</li>
              </ul>
            </div>
          </div>
        </CGUSection>

        <CGUSection
          title="Politique de Confidentialité"
          isOpen={openSections['privacy'] ?? false}
          onToggle={() => toggleSection('privacy')}
        >
          <div className="space-y-4">
          <p> Dernière mise à jour : 23 novembre 2024</p>
            <div>
              La présente Politique de Confidentialité décrit nos règles et procédures concernant la collecte, l'utilisation et la divulgation de vos informations lorsque vous utilisez le Service. Elle vous informe également de vos droits en matière de confidentialité et de la protection juridique dont vous bénéficiez.
            </div>
            <h2>Interprétation et Définitions</h2>
          <h3>Interprétation</h3>
          <p>Les termes dont la première lettre est en majuscule ont des significations définies selon les conditions suivantes. Ces définitions conservent le même sens, qu'elles soient au singulier ou au pluriel.</p>
          <h3>Définitions</h3>
          <p>Dans le cadre de cette Politique de Confidentialité :</p>
          <ul>
            <li><strong>Compte</strong> désigne un compte unique créé pour vous permettre d'accéder à notre Service ou à certaines de ses parties.</li>
            <li><strong>Affilié</strong> désigne une entité qui contrôle, est contrôlée par ou est sous contrôle commun avec une partie, où "contrôle" signifie la propriété de 50% ou plus des actions, participations ou autres titres donnant droit de vote pour l'élection des administrateurs ou autre autorité de gestion.</li>
            <li><strong>Application</strong> fait référence à Allo Colis, le programme informatique fourni par la Société.</li>
            <li><strong>Société</strong> (désignée par "la Société", "Nous", "Notre" ou "Nos" dans cet accord) fait référence à Allo Colis.</li>
            <li><strong>Pays</strong> fait référence au Bénin.</li>
            <li><strong>Appareil</strong> désigne tout appareil pouvant accéder au Service comme un ordinateur, un téléphone portable ou une tablette numérique.</li>
            <li><strong>Données Personnelles</strong> désigne toute information se rapportant à une personne physique identifiée ou identifiable.</li>
            <li><strong>Service</strong> fait référence à l'Application.</li>
            <li><strong>Prestataire de Services</strong> désigne toute personne physique ou morale qui traite les données pour le compte de la Société. Il s'agit d'entreprises tierces ou de personnes employées par la Société pour faciliter le Service, fournir le Service au nom de la Société, exécuter des services liés au Service ou aider la Société à analyser l'utilisation du Service.</li>
            <li><strong>Données d'Utilisation</strong> désigne les données collectées automatiquement, générées soit par l'utilisation du Service, soit par l'infrastructure du Service elle-même (par exemple, la durée d'une visite de page).</li>
            <li><strong>Vous</strong> désigne la personne accédant ou utilisant le Service, ou la société ou autre entité juridique au nom de laquelle cette personne accède ou utilise le Service, selon le cas.</li>
          </ul>
          <h2>Collecte et Utilisation de vos Données Personnelles</h2>
          <h3>Types de Données Collectées</h3>
          <h4>Données Personnelles</h4>
          <p>Lors de l'utilisation de notre Service, nous pouvons vous demander de nous fournir certaines informations personnellement identifiables qui peuvent être utilisées pour vous contacter ou vous identifier. Ces informations peuvent inclure, sans s'y limiter :</p>
          <ul>
            <li>Adresse e-mail</li>
            <li>Nom et prénom</li>
            <li>Numéro de téléphone</li>
            <li>Adresse, État, Province, Code postal, Ville</li>
            <li>Données d'utilisation</li>
          </ul>
          <h4>Données d'Utilisation</h4>
          <p>Les Données d'Utilisation sont collectées automatiquement lors de l'utilisation du Service.</p>
          <p>Les Données d'Utilisation peuvent inclure des informations telles que l'adresse de protocole Internet de votre Appareil (par exemple, adresse IP), le type de navigateur, la version du navigateur, les pages de notre Service que vous visitez, la date et l'heure de votre visite, le temps passé sur ces pages, les identifiants uniques de l'appareil et d'autres données de diagnostic.</p>
          <p>Lorsque vous accédez au Service par ou via un appareil mobile, nous pouvons collecter automatiquement certaines informations, y compris, mais sans s'y limiter, le type d'appareil mobile que vous utilisez, l'identifiant unique de votre appareil mobile, l'adresse IP de votre appareil mobile, votre système d'exploitation mobile, le type de navigateur Internet mobile que vous utilisez, les identifiants uniques de l'appareil et d'autres données de diagnostic.</p>
          <p>Nous pouvons également collecter les informations que votre navigateur envoie chaque fois que vous visitez notre Service ou lorsque vous accédez au Service par ou via un appareil mobile.</p>

          <h2>Utilisation de vos Données Personnelles</h2>
        <p>La Société peut utiliser les Données Personnelles aux fins suivantes :</p>
        <ul>
          <li><strong>Fournir et maintenir notre Service</strong>, notamment pour surveiller l'utilisation de notre Service.</li>
          <li><strong>Gérer votre Compte :</strong> gérer votre inscription en tant qu'utilisateur du Service. Les Données Personnelles que vous fournissez peuvent vous donner accès à différentes fonctionnalités du Service disponibles pour les utilisateurs inscrits.</li>
          <li><strong>Pour l'exécution d'un contrat :</strong> le développement, le respect et l'exécution du contrat d'achat pour les produits, articles ou services que vous avez achetés ou de tout autre contrat avec nous via le Service.</li>
          <li><strong>Pour vous contacter :</strong> vous contacter par email, appels téléphoniques, SMS ou autres formes équivalentes de communication électronique, comme les notifications push d'une application mobile, concernant des mises à jour ou des communications informatives liées aux fonctionnalités, produits ou services contractés, y compris les mises à jour de sécurité, lorsque cela est nécessaire ou raisonnable pour leur mise en œuvre.</li>
          <li><strong>Pour vous fournir</strong> des actualités, offres spéciales et informations générales sur d'autres biens, services et événements que nous proposons et qui sont similaires à ceux que vous avez déjà achetés ou sur lesquels vous vous êtes renseigné, sauf si vous avez choisi de ne pas recevoir ces informations.</li>
          <li><strong>Pour gérer vos demandes :</strong> traiter et gérer vos demandes auprès de nous.</li>
          <li><strong>Pour les transferts d'entreprise :</strong> nous pouvons utiliser vos informations pour évaluer ou effectuer une fusion, cession, restructuration, réorganisation, dissolution ou autre vente ou transfert de tout ou partie de nos actifs, que ce soit dans le cadre de la continuité d'exploitation ou dans le cadre d'une faillite, liquidation ou procédure similaire, dans laquelle les Données Personnelles que nous détenons sur les utilisateurs de notre Service font partie des actifs transférés.</li>
          <li><strong>À d'autres fins :</strong> nous pouvons utiliser vos informations à d'autres fins, telles que l'analyse de données, l'identification des tendances d'utilisation, la détermination de l'efficacité de nos campagnes promotionnelles et pour évaluer et améliorer notre Service, nos produits, services, marketing et votre expérience.</li>
        </ul>
        <p>Nous pouvons partager vos informations personnelles dans les situations suivantes :</p>
        <ul>
          <li><strong>Avec les Prestataires de Services :</strong> nous pouvons partager vos informations personnelles avec les Prestataires de Services pour surveiller et analyser l'utilisation de notre Service, pour vous contacter.</li>
          <li><strong>Pour les transferts d'entreprise :</strong> nous pouvons partager ou transférer vos informations personnelles dans le cadre ou pendant les négociations d'une fusion, vente d'actifs de la Société, financement ou acquisition de tout ou partie de notre entreprise par une autre société.</li>
          <li><strong>Avec les Affiliés :</strong> nous pouvons partager vos informations avec nos affiliés, auquel cas nous exigerons que ces affiliés respectent cette Politique de Confidentialité. Les affiliés comprennent notre société mère et toutes autres filiales, partenaires de coentreprise ou autres sociétés que nous contrôlons ou qui sont sous contrôle commun avec nous.</li>
          <li><strong>Avec les partenaires commerciaux :</strong> nous pouvons partager vos informations avec nos partenaires commerciaux pour vous proposer certains produits, services ou promotions.</li>
          <li><strong>Avec d'autres utilisateurs :</strong> lorsque vous partagez des informations personnelles ou interagissez dans les zones publiques avec d'autres utilisateurs, ces informations peuvent être vues par tous les utilisateurs et peuvent être diffusées publiquement à l'extérieur.</li>
          <li><strong>Avec votre consentement :</strong> nous pouvons divulguer vos informations personnelles à toute autre fin avec votre consentement.</li>
            </ul>
            <h2>Conservation de vos Données Personnelles</h2>
<p>La Société ne conservera vos Données Personnelles que le temps nécessaire aux fins énoncées dans cette Politique de Confidentialité. Nous conserverons et utiliserons vos Données Personnelles dans la mesure nécessaire pour respecter nos obligations légales (par exemple, si nous devons conserver vos données pour nous conformer aux lois applicables), résoudre les litiges et appliquer nos accords et politiques juridiques.</p>
<p>La Société conservera également les Données d'Utilisation à des fins d'analyse interne. Les Données d'Utilisation sont généralement conservées pendant une période plus courte, sauf lorsque ces données sont utilisées pour renforcer la sécurité ou améliorer les fonctionnalités de notre Service, ou si nous sommes légalement tenus de conserver ces données pendant des périodes plus longues.</p>
<h2>Transfert de vos Données Personnelles</h2>
<p>Vos informations, y compris les Données Personnelles, sont traitées dans les bureaux d'exploitation de la Société et dans tous les autres lieux où se trouvent les parties impliquées dans le traitement. Cela signifie que ces informations peuvent être transférées vers — et maintenues sur — des ordinateurs situés en dehors de votre état, province, pays ou autre juridiction gouvernementale où les lois sur la protection des données peuvent différer de celles de votre juridiction.</p>
<p>Votre consentement à cette Politique de Confidentialité suivi de votre soumission de ces informations représente votre accord à ce transfert.</p>
<p>La Société prendra toutes les mesures raisonnablement nécessaires pour garantir que vos données sont traitées de manière sécurisée et conformément à cette Politique de Confidentialité, et aucun transfert de vos Données Personnelles n'aura lieu vers une organisation ou un pays à moins qu'il n'y ait des contrôles adéquats en place, y compris la sécurité de vos données et autres informations personnelles.</p>
<h2>Suppression de vos Données Personnelles</h2>
<p>Vous avez le droit de supprimer ou de demander que nous vous aidions à supprimer les Données Personnelles que nous avons collectées à votre sujet.</p>
<p>Notre Service peut vous donner la possibilité de supprimer certaines informations vous concernant directement depuis le Service.</p>
<p>Vous pouvez mettre à jour, modifier ou supprimer vos informations à tout moment en vous connectant à votre Compte, si vous en avez un, et en visitant la section des paramètres du compte qui vous permet de gérer vos informations personnelles. Vous pouvez également nous contacter pour demander l'accès, la correction ou la suppression de toute information personnelle que vous nous avez fournie.</p>
<p>Veuillez noter, cependant, que nous pourrions avoir besoin de conserver certaines informations lorsque nous avons une obligation légale ou une base légale pour le faire.</p>
<h2>Divulgation de vos Données Personnelles</h2>
<h3>Transactions commerciales</h3>
<p>Si la Société est impliquée dans une fusion, acquisition ou vente d'actifs, vos Données Personnelles peuvent être transférées. Nous vous informerons avant que vos Données Personnelles ne soient transférées et ne deviennent soumises à une politique de confidentialité différente.</p>
<h3>Application de la loi</h3>
<p>Dans certaines circonstances, la Société peut être tenue de divulguer vos Données Personnelles si la loi l'exige ou en réponse à des demandes valides des autorités publiques (par exemple, un tribunal ou une agence gouvernementale).</p>
<h3>Autres exigences légales</h3>
<p>La Société peut divulguer vos Données Personnelles si elle estime de bonne foi qu'une telle action est nécessaire pour :</p>
<ul>
  <li>Se conformer à une obligation légale</li>
  <li>Protéger et défendre les droits ou la propriété de la Société</li>
  <li>Prévenir ou enquêter sur d'éventuels actes répréhensibles en lien avec le Service</li>
  <li>Protéger la sécurité personnelle des Utilisateurs du Service ou du public</li>
  <li>Se protéger contre la responsabilité juridique</li>
</ul>
<h2>Sécurité de vos Données Personnelles</h2>
<p>La sécurité de vos Données Personnelles est importante pour nous. Cependant, n'oubliez pas qu'aucune méthode de transmission sur Internet ou méthode de stockage électronique n'est sécurisée à 100%. Bien que nous nous efforcions d'utiliser des moyens commercialement acceptables pour protéger vos Données Personnelles, nous ne pouvons garantir leur sécurité absolue.</p>
<h2>Confidentialité des Enfants</h2>
<p>Notre Service ne s'adresse pas aux personnes de moins de 13 ans. Nous ne collectons pas sciemment d'informations personnellement identifiables auprès de personnes de moins de 13 ans. Si vous êtes un parent ou un tuteur et que vous savez que votre enfant nous a fourni des Données Personnelles, veuillez nous contacter. Si nous apprenons que nous avons collecté des Données Personnelles d'une personne de moins de 13 ans sans vérification du consentement parental, nous prenons des mesures pour supprimer ces informations de nos serveurs.</p>
<p>Si nous devons nous appuyer sur le consentement comme base légale pour traiter vos informations et que votre pays exige le consentement d'un parent, nous pouvons exiger le consentement de votre parent avant de collecter et d'utiliser ces informations.</p>
<h2>Liens vers d'Autres Sites Web</h2>
<p>Notre Service peut contenir des liens vers d'autres sites Web qui ne sont pas exploités par nous. Si vous cliquez sur un lien tiers, vous serez dirigé vers le site de ce tiers. Nous vous conseillons vivement d'examiner la Politique de Confidentialité de chaque site que vous visitez.</p>
<p>Nous n'avons aucun contrôle et n'assumons aucune responsabilité quant au contenu, aux politiques de confidentialité ou aux pratiques des sites ou services tiers.</p>
<h2>Modifications de cette Politique de Confidentialité</h2>
<p>Nous pouvons mettre à jour notre Politique de Confidentialité de temps à autre. Nous vous informerons de toute modification en publiant la nouvelle Politique de Confidentialité sur cette page.</p>
<p>Nous vous informerons par e-mail et/ou par un avis visible sur notre Service avant que la modification ne devienne effective et mettrons à jour la date de "Dernière mise à jour" en haut de cette Politique de Confidentialité.</p>
<p>Il vous est conseillé de consulter périodiquement cette Politique de Confidentialité pour prendre connaissance de toute modification. Les modifications apportées à cette Politique de Confidentialité entrent en vigueur lorsqu'elles sont publiées sur cette page.</p>

      </div>
        </CGUSection>
    
        <CGUSection
          title="Contact"
          isOpen={openSections['contact'] ?? false}
          onToggle={() => toggleSection('contact')}
        >
          <p>
            Pour toute question relative aux présentes CGU, les utilisateurs peuvent contacter l'Éditeur à l'adresse suivante : contact@allocolis.com
          </p>
        </CGUSection>
    
      </div>

      <div className="px-6 py-8 text-center text-sm text-gray-500">
        © 2024 Allo Colis. Tous droits réservés.
      </div>
    </div>
  );
};

export default CGUComponent;