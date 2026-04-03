const PrivacyPolicy = () => {
    return (
        <div className="py-16 mt-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white shadow-2xl p-6 md:p-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Politique de confidentialité
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                    </p>

                    <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
                        <p>
                            La présente politique de confidentialité décrit comment la société KDM LOGISTIQUE collecte, utilise, protège et supprime les données personnelles de nos clients. Nous nous engageons à respecter votre vie privée et à protéger vos informations conformément à la réglementation en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD).
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">
                            1. Données collectées
                        </h2>
                        <p>
                            Dans le cadre de nos prestations de déménagement, transport et logistique, nous sommes amenés à collecter les informations suivantes :
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Nom et prénom</li>
                            <li>Adresse postale (adresse de départ et d'arrivée du déménagement)</li>
                            <li>Adresse e-mail</li>
                            <li>Numéro de téléphone</li>
                            <li>Photos ou vidéos de l’appartement, de la maison ou de l’entrée (fournies volontairement pour établir un devis précis)</li>
                            <li>Toute autre information que vous choisissez de nous communiquer dans le cadre de votre demande de devis ou de votre dossier client</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">
                            2. Utilisation des données
                        </h2>
                        <p>
                            Vos données personnelles sont utilisées exclusivement pour :
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Établir des devis personnalisés et répondre à vos demandes</li>
                            <li>Organiser et réaliser les prestations de déménagement, transport ou logistique</li>
                            <li>Communiquer avec vous concernant l’avancement de votre dossier</li>
                            <li>Facturer et gérer les paiements</li>
                            <li>Améliorer nos services et la qualité de notre relation client</li>
                        </ul>
                        <p>
                            Nous ne vendons, ne louons ni n’échangeons jamais vos données personnelles à des tiers à des fins commerciales.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">
                            3. Base légale du traitement
                        </h2>
                        <p>
                            Le traitement de vos données repose sur l’exécution du contrat de prestation de services (devis accepté) et sur votre consentement pour les éléments facultatifs (photos, vidéos). Vous pouvez retirer votre consentement à tout moment.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">
                            4. Durée de conservation et suppression des données
                        </h2>
                        <p>
                            Conformément à notre engagement de protection de vos informations, <strong>toutes vos données personnelles sont supprimées à la fin de chaque prestation ou à la fermeture de votre dossier client</strong>. Aucune donnée n’est conservée à des fins historiques ou statistiques après cette échéance, sauf obligation légale contraire (ex : factures conservées 10 ans pour la comptabilité – dans ce cas seules les données strictement nécessaires à la facturation sont conservées).
                        </p>
                        <p>
                            Les photos et vidéos que vous avez téléchargées sont immédiatement effacées dès la finalisation de la prestation ou la clôture du dossier.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">
                            5. Sécurité des données
                        </h2>
                        <p>
                            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation. L’accès à vos informations est strictement limité aux employés et sous-traitants qui en ont besoin pour l’exécution de la prestation (par exemple, l’équipe de déménagement pour visualiser les photos de l’entrée).
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">
                            6. Vos droits
                        </h2>
                        <p>
                            Conformément à la réglementation applicable, vous disposez des droits suivants sur vos données personnelles :
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Droit d’accès</strong> : obtenir la confirmation que vos données sont traitées et y accéder.</li>
                            <li><strong>Droit de rectification</strong> : faire corriger des données inexactes ou incomplètes.</li>
                            <li><strong>Droit à l’effacement</strong> (« droit à l’oubli ») : demander la suppression de vos données, sous réserve des obligations légales.</li>
                            <li><strong>Droit à la limitation</strong> : suspendre le traitement dans certaines situations.</li>
                            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré.</li>
                            <li><strong>Droit d’opposition</strong> : vous opposer au traitement de vos données.</li>
                        </ul>
                        <p>
                            Pour exercer ces droits, vous pouvez nous contacter à l’adresse électronique indiquée ci-dessous. Nous nous engageons à répondre dans un délai maximal d’un mois.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">
                            7. Transfert des données
                        </h2>
                        <p>
                            Vos données sont hébergées sur des serveurs situés au sein de l’Union européenne. Nous ne transférons pas vos données hors de l’UE.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">
                            8. Cookies et traceurs
                        </h2>
                        {/* <p>
                            Notre site web utilise des cookies strictement nécessaires à son bon fonctionnement (ex : mémorisation de votre session). Vous n’avez pas à fournir de consentement pour ces cookies techniques. Nous n’utilisons pas de cookies de publicité ou de réseaux sociaux.
                        </p> */}

                        <p>
                            Vous n’avez pas à fournir de consentement pour ces cookies techniques. Nous n’utilisons pas de cookies de publicité ou de réseaux sociaux.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">
                            9. Modifications de la politique
                        </h2>
                        <p>
                            Nous pouvons être amenés à modifier cette politique de confidentialité. Toute modification sera publiée sur cette page avec la date de mise à jour. Nous vous invitons à la consulter régulièrement.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">
                            10. Nous contacter
                        </h2>
                        <p>
                            Pour toute question relative à cette politique ou pour exercer vos droits, veuillez nous écrire à :
                        </p>
                        <p className="bg-gray-100 p-3 rounded-md">
                            <strong>KDM LOGISTIQUE</strong><br />
                            Email : <a href="mailto:kdmlogistique@gmail.com" className="text-blue-600 hover:underline">kdmlogistique@gmail.com</a><br />
                            Adresse : 17 Rue du Champtier 92500, Rueil-Malmaison <br />
                            Téléphone : 06 66 28 32 43
                        </p>

                        <p className="text-sm text-gray-500 border-t pt-6 mt-8">
                            Conformément à la loi, vous disposez également du droit d’introduire une réclamation auprès de la CNIL (Commission Nationale de l’Informatique et des Libertés) si vous estimez que vos droits ne sont pas respectés.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;