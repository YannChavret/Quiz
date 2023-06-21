import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Card } from "flowbite-react";
import "../app/globals.css";
import PiedDePage from "@/components/Footer";
import Menu from "@/components/Menu";
import AnimatedBackground from "@/components/Background";




const EndScore = () => {
  const { query, push } = useRouter();

  const startQuiz = async () => {
    try {
      const url = `/api/question?module=${query.module}&level=${query.level}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const questionsData = await response.json();
  
      // Stocke les données des questions dans localStorage
      localStorage.setItem("questions", JSON.stringify(questionsData));
  
      // Navigue vers la page Game
      push("/games");
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    // Vérifiez si les paramètres module et level sont présents dans la query string
    if (!query.module || !query.level) {
      // Redirigez l'utilisateur vers la page précédente si les paramètres sont manquants
      // push("/");
    }
  }, [query.module, query.level, push]);

  return (
    <div>
      <Menu />
      <AnimatedBackground/>

      <div className="grid place-items-center my-6">
          <Card>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Test.
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              Ce quiz comporte 20 questions.<br/>
              Vous disposez de 30 secondes par question.<br/>
              Etes-vous prêt ?
            </p>

            <Button onClick={startQuiz} color="failure" pill>Démarrer le quiz</Button>

          </Card>
      </div>

      <PiedDePage />
    </div>
  );
}

export default EndScore;
