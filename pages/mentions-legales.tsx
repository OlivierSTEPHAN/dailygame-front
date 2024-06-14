// pages/mentions-legales.tsx

import Layout from "@/components/Layout";
import React from "react";

const MentionsLegales: React.FC = () => {
  return (
    <Layout title="Mentions légales">
      <div className="p-4 flex flex-col justify-start">
        <h1 className="text-2xl font-bold mb-4">Mentions L&eacute;gales</h1>

        <section>
          <h2 className="text-lg font-bold mb-2">&Eacute;diteur du site</h2>
          <p>
            Olivier STEPHAN <br />
            Adresse : Rennes <br />
            Email : olivierstephan99@hotmail.fr <br />
          </p>
        </section>

        <section className="mt-4">
          <h2 className="text-lg font-bold mb-2">H&eacute;bergement</h2>
          <p>
            Ce site est hébergé par Vercel. <br />
            Vercel Inc. <br />
            Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, &Eacute;tats-Unis{" "}
            <br />
            Téléphone : +1 (877) 618-1204 <br />
            Email : support@vercel.com <br />
          </p>
        </section>

        <section className="mt-4">
          <h2 className="text-lg font-bold mb-2">
            Propri&eacute;t&eacute; intellectuelle
          </h2>
          <p>
            Le pr&eacute;sent site web et l&apos;ensemble de son contenu, y
            compris textes, images, sons, vid&eacute;os, et autres
            &eacute;l&eacute;ments, sont la propri&eacute;t&eacute; exclusive de
            Olivier STEPHAN ou font l&apos;objet d&apos;une autorisation
            d&apos;utilisation.
            <br />
            Toute reproduction, repr&eacute;sentation, modification,
            publication, adaptation de tout ou partie des &eacute;l&eacute;ments
            du site, quel que soit le moyen ou le proc&eacute;d&eacute;
            utilis&eacute;, est interdite sauf autorisation &eacute;crite
            pr&eacute;alable de Olivier STEPHAN.
            <br />
            Les données des jeux présentées sur ce site proviennent de IGDB et
            sont libres de droit. Elles ont été récupérées et stockées afin de
            faciliter leur manipulation dans le cadre de ce site.
          </p>
        </section>

        <section className="mt-4">
          <h2 className="text-lg font-bold mb-2">
            Protection des donn&eacute;es personnelles
          </h2>
          <p>Aucune donnée n&apos;est collectée sur ce site.</p>
        </section>

        <section className="mt-4">
          <h2 className="text-lg font-bold mb-2">Cookies</h2>
          <p>Ce site n&apos;utilise pas de cookie.</p>
        </section>

        <section className="mt-4">
          <h2 className="text-lg font-bold mb-2">Responsabilit&eacute;</h2>
          <p>
            Olivier STEPHAN s&apos;efforce de fournir des informations exactes
            et &agrave; jour sur ce site, mais ne saurait &ecirc;tre tenue pour
            responsable de toute erreur, omission ou r&eacute;sultat obtenu par
            suite de l&apos;utilisation des informations fournies.
          </p>
        </section>

        <section className="mt-4">
          <h2 className="text-lg font-bold mb-2">Contact</h2>
          <p>
            Pour toute question concernant les mentions l&eacute;gales, vous
            pouvez nous contacter &agrave; l&apos;adresse suivante :
            olivierstephan99@hotmail.fr.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default MentionsLegales;
