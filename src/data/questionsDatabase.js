export const questionsDatabase = {
  categories: {
    historiaBiblica: {
      name: "Historia Bíblica",
      icon: "book",
      description: "Preguntas sobre eventos y personajes bíblicos",
      levels: {
        facil: [
          {
            id: "hb_f_1",
            question: "¿Quién fue el primer rey de Israel?",
            options: ["David", "Saúl", "Samuel"],
            correct: 1,
            explanation: "Saúl fue el primer rey de Israel, ungido por el profeta Samuel (1 Samuel 10:1)."
          },
          {
            id: "hb_f_2",
            question: "¿Cuántos años predicó Noé antes del diluvio?",
            options: ["120", "100", "80"],
            correct: 0,
            explanation: "Noé predicó durante 120 años mientras construía el arca (Génesis 6:3)."
          },
          {
            id: "hb_f_3",
            question: "¿Cuántos días estuvo Jonás en el vientre del pez?",
            options: ["2", "3", "4"],
            correct: 1,
            explanation: "Jonás estuvo tres días y tres noches en el vientre del gran pez (Jonás 1:17)."
          },
          {
            id: "hb_f_4",
            question: "¿Cuál era el nombre original de Abraham?",
            options: ["Abram", "Abraín", "Abel"],
            correct: 0,
            explanation: "Su nombre original era Abram antes de que Dios lo cambiara a Abraham (Génesis 17:5)."
          },
          {
            id: "hb_f_5",
            question: "¿Quién fue vendido como esclavo por sus hermanos?",
            options: ["José", "Benjamín", "Rubén"],
            correct: 0,
            explanation: "José fue vendido como esclavo por sus hermanos (Génesis 37:28)."
          },
          {
            id: "hb_f_6",
            question: "¿Cuál era el nombre de la esposa de Abraham?",
            options: ["Sara", "Raquel", "Rebeca"],
            correct: 0,
            explanation: "Sara era la esposa de Abraham, originalmente llamada Sarai (Génesis 17:15)."
          },
          {
            id: "hb_f_7",
            question: "¿Quién construyó el arca?",
            options: ["Noé", "Moisés", "Abraham"],
            correct: 0,
            explanation: "Noé construyó el arca siguiendo las instrucciones de Dios (Génesis 6:14-22)."
          },
          {
            id: "hb_f_8",
            question: "¿Quién fue el padre de David?",
            options: ["Isaí", "Saúl", "Samuel"],
            correct: 0,
            explanation: "Isaí fue el padre de David (1 Samuel 16:1)."
          },
          {
            id: "hb_f_9",
            question: "¿A qué edad murió Jesús?",
            options: ["33", "30", "35"],
            correct: 0,
            explanation: "Jesús murió aproximadamente a los 33 años de edad."
          },
          {
            id: "hb_f_10",
            question: "¿Quién escribió la mayoría de los Salmos?",
            options: ["David", "Salomón", "Moisés"],
            correct: 0,
            explanation: "David escribió la mayoría de los Salmos (73 de ellos)."
          }
        ],
        medio: [
          {
            id: "hb_m_1",
            question: "¿Cuántos años vivió Matusalén?",
            options: ["969", "950", "930"],
            correct: 0,
            explanation: "Matusalén vivió 969 años, la persona más longeva mencionada en la Biblia (Génesis 5:27)."
          },
          {
            id: "hb_m_2",
            question: "¿Quién fue el padre de Juan el Bautista?",
            options: ["José", "Zacarías", "Simón"],
            correct: 1,
            explanation: "Zacarías fue el padre de Juan el Bautista (Lucas 1:13)."
          },
          {
            id: "hb_m_3",
            question: "¿Cuántos hombres derrotó Sansón con una quijada de asno?",
            options: ["1000", "2000", "3000"],
            correct: 0,
            explanation: "Sansón mató a mil hombres con una quijada de asno (Jueces 15:15)."
          },
          {
            id: "hb_m_4",
            question: "¿Cuántos años duró la construcción del templo de Salomón?",
            options: ["7", "10", "12"],
            correct: 0,
            explanation: "La construcción del templo duró 7 años (1 Reyes 6:38)."
          },
          {
            id: "hb_m_5",
            question: "¿Cuántos libros escribió Salomón?",
            options: ["3", "4", "5"],
            correct: 0,
            explanation: "Salomón escribió Proverbios, Eclesiastés y Cantares."
          }
        ],
        dificil: [
          {
            id: "hb_d_1",
            question: "¿Qué profeta fue enviado a Nínive?",
            options: ["Jonás", "Joel", "Amós"],
            correct: 0,
            explanation: "Dios envió a Jonás a predicar a Nínive (Jonás 1:1-2)."
          },
          {
            id: "hb_d_2",
            question: "¿Cuántos años duró la sequía en tiempos de Elías?",
            options: ["3 años y medio", "4 años", "7 años"],
            correct: 0,
            explanation: "La sequía duró 3 años y medio (Santiago 5:17)."
          },
          {
            id: "hb_d_3",
            question: "¿Quién fue el primer mártir cristiano?",
            options: ["Esteban", "Santiago", "Pedro"],
            correct: 0,
            explanation: "Esteban fue el primer mártir cristiano (Hechos 7:54-60)."
          },
          {
            id: "hb_d_4",
            question: "¿Cuántos años tenía Sara cuando nació Isaac?",
            options: ["90", "91", "89"],
            correct: 0,
            explanation: "Sara tenía 90 años cuando nació Isaac (Génesis 17:17)."
          },
          {
            id: "hb_d_5",
            question: "¿Cuántos años duró el viaje de Israel por el desierto?",
            options: ["40", "42", "38"],
            correct: 0,
            explanation: "Israel vagó 40 años por el desierto (Números 32:13)."
          }
        ]
      }
    },
    geografiaBiblica: {
      name: "Geografía Bíblica",
      icon: "map",
      description: "Preguntas sobre lugares y territorios bíblicos",
      levels: {
        facil: [
          {
            id: "gb_f_1",
            question: "¿Dónde nació Jesús?",
            options: ["Nazaret", "Belén", "Jerusalén"],
            correct: 1,
            explanation: "Jesús nació en Belén de Judea (Mateo 2:1)."
          },
          {
            id: "gb_f_2",
            question: "¿En qué monte recibió Moisés los 10 mandamientos?",
            options: ["Sinaí", "Carmelo", "Nebo"],
            correct: 0,
            explanation: "Moisés recibió los 10 mandamientos en el Monte Sinaí (Éxodo 19-20)."
          },
          {
            id: "gb_f_3",
            question: "¿Qué mar cruzaron los israelitas?",
            options: ["Mar Rojo", "Mar Muerto", "Mar Mediterráneo"],
            correct: 0,
            explanation: "Los israelitas cruzaron el Mar Rojo (Éxodo 14:21-22)."
          },
          {
            id: "gb_f_4",
            question: "¿En qué río fue bautizado Jesús?",
            options: ["Jordán", "Nilo", "Éufrates"],
            correct: 0,
            explanation: "Jesús fue bautizado en el río Jordán (Mateo 3:13)."
          },
          {
            id: "gb_f_5",
            question: "¿Dónde creció Jesús?",
            options: ["Nazaret", "Belén", "Capernaum"],
            correct: 0,
            explanation: "Jesús creció en Nazaret (Lucas 2:39-40)."
          }
        ],
        medio: [
          {
            id: "gb_m_1",
            question: "¿Dónde estaba el Jardín del Edén?",
            options: ["Entre el Tigris y Éufrates", "En Canaán", "En Egipto"],
            correct: 0,
            explanation: "El Jardín del Edén estaba entre los ríos Tigris y Éufrates (Génesis 2:14)."
          },
          {
            id: "gb_m_2",
            question: "¿Qué monte se menciona en el diluvio?",
            options: ["Ararat", "Sinaí", "Hermón"],
            correct: 0,
            explanation: "El arca reposó en los montes de Ararat (Génesis 8:4)."
          },
          {
            id: "gb_m_3",
            question: "¿Dónde fue convertido Saulo?",
            options: ["Damasco", "Jerusalén", "Antioquía"],
            correct: 0,
            explanation: "Saulo fue convertido camino a Damasco (Hechos 9:3)."
          },
          {
            id: "gb_m_4",
            question: "¿En qué isla estuvo exiliado Juan?",
            options: ["Patmos", "Creta", "Chipre"],
            correct: 0,
            explanation: "Juan estuvo exiliado en la isla de Patmos (Apocalipsis 1:9)."
          },
          {
            id: "gb_m_5",
            question: "¿Dónde predicó Jonás?",
            options: ["Nínive", "Babilonia", "Tiro"],
            correct: 0,
            explanation: "Jonás predicó en Nínive (Jonás 3:1-4)."
          }
        ],
        dificil: [
          {
            id: "gb_d_1",
            question: "¿En qué ciudad se llamaron cristianos por primera vez a los discípulos?",
            options: ["Jerusalén", "Roma", "Antioquía"],
            correct: 2,
            explanation: "Los discípulos fueron llamados cristianos por primera vez en Antioquía (Hechos 11:26)."
          },
          {
            id: "gb_d_2",
            question: "¿Qué ciudad visitó Pablo en Macedonia?",
            options: ["Filipos", "Corinto", "Éfeso"],
            correct: 0,
            explanation: "Pablo visitó Filipos en Macedonia (Hechos 16:12)."
          },
          {
            id: "gb_d_3",
            question: "¿Dónde escribió Pablo la carta a Filemón?",
            options: ["Roma", "Éfeso", "Corinto"],
            correct: 0,
            explanation: "Pablo escribió a Filemón durante su prisión en Roma."
          },
          {
            id: "gb_d_4",
            question: "¿En qué región estaba Tarso?",
            options: ["Cilicia", "Galacia", "Capadocia"],
            correct: 0,
            explanation: "Tarso estaba en la región de Cilicia (Hechos 21:39)."
          },
          {
            id: "gb_d_5",
            question: "¿Dónde estaba el monte Carmelo?",
            options: ["Israel", "Líbano", "Siria"],
            correct: 0,
            explanation: "El monte Carmelo estaba en Israel (1 Reyes 18:19)."
          }
        ]
      }
    },
    doctrinaBiblica: {
      name: "Doctrina Bíblica",
      icon: "book",
      description: "Preguntas sobre enseñanzas y doctrinas bíblicas",
      levels: {
        facil: [
          {
            id: "db_f_1",
            question: "¿Cuál es el primer mandamiento con promesa?",
            options: ["Honrar padres", "No matar", "No robar"],
            correct: 0,
            explanation: "Honrar a padre y madre es el primer mandamiento con promesa (Efesios 6:2)."
          },
          {
            id: "db_f_2",
            question: "¿Cuántos frutos del Espíritu hay?",
            options: ["7", "9", "12"],
            correct: 1,
            explanation: "Hay 9 frutos del Espíritu según Gálatas 5:22-23."
          },
          {
            id: "db_f_3",
            question: "¿Cuál es el mayor mandamiento?",
            options: ["Amar a Dios", "No matar", "No mentir"],
            correct: 0,
            explanation: "Amar a Dios con todo el corazón es el mayor mandamiento (Mateo 22:37-38)."
          },
          {
            id: "db_f_4",
            question: "¿Cuántos dones espirituales principales menciona Pablo?",
            options: ["7", "9", "12"],
            correct: 1,
            explanation: "Pablo menciona 9 dones principales en 1 Corintios 12:8-10."
          },
          {
            id: "db_f_5",
            question: "¿Qué significa la palabra 'Evangelio'?",
            options: ["Buenas nuevas", "Libro sagrado", "Palabras de Dios"],
            correct: 0,
            explanation: "Evangelio significa 'buenas nuevas' o 'buenas noticias'."
          },
          {
            id: "db_f_6",
            question: "¿Cuáles son las tres virtudes teologales?",
            options: ["Fe, esperanza y amor", "Paz, amor y gozo", "Fe, caridad y paciencia"],
            correct: 0,
            explanation: "Las tres virtudes teologales son fe, esperanza y amor (1 Corintios 13:13)."
          },
          {
            id: "db_f_7",
            question: "¿Qué significa la palabra 'Mesías'?",
            options: ["Ungido", "Salvador", "Rey"],
            correct: 0,
            explanation: "Mesías significa 'Ungido' en hebreo."
          },
          {
            id: "db_f_8",
            question: "¿Cuál es el principio de la sabiduría?",
            options: ["El temor de Jehová", "El conocimiento", "La fe"],
            correct: 0,
            explanation: "El temor de Jehová es el principio de la sabiduría (Proverbios 1:7)."
          },
          {
            id: "db_f_9",
            question: "¿Cuántos mandamientos dio Dios a Moisés?",
            options: ["10", "12", "7"],
            correct: 0,
            explanation: "Dios dio 10 mandamientos a Moisés en el Monte Sinaí (Éxodo 20)."
          },
          {
            id: "db_f_10",
            question: "¿Qué es el fruto del Espíritu?",
            options: ["Amor, gozo, paz...", "Profecía, lenguas...", "Sabiduría, ciencia..."],
            correct: 0,
            explanation: "El fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza (Gálatas 5:22-23)."
          }
        ],
        medio: [
          {
            id: "db_m_1",
            question: "¿Quién dijo 'la fe sin obras está muerta'?",
            options: ["Pablo", "Pedro", "Santiago"],
            correct: 2,
            explanation: "Santiago escribió que la fe sin obras está muerta (Santiago 2:17)."
          },
          {
            id: "db_m_2",
            question: "¿Cuál es la definición bíblica de la fe?",
            options: ["La certeza de lo que se espera", "Creer en Dios", "Hacer buenas obras"],
            correct: 0,
            explanation: "La fe es la certeza de lo que se espera, la convicción de lo que no se ve (Hebreos 11:1)."
          },
          {
            id: "db_m_3",
            question: "¿Qué significa la palabra 'gracia'?",
            options: ["Don inmerecido", "Perdón", "Bendición"],
            correct: 0,
            explanation: "La gracia es el don inmerecido de Dios."
          },
          {
            id: "db_m_4",
            question: "¿Qué es el arrepentimiento?",
            options: ["Cambio de mente", "Pedir perdón", "Sentir tristeza"],
            correct: 0,
            explanation: "El arrepentimiento implica un cambio de mente que lleva a un cambio de conducta."
          },
          {
            id: "db_m_5",
            question: "¿Qué son los dones del Espíritu?",
            options: ["Capacidades espirituales", "Talentos naturales", "Virtudes morales"],
            correct: 0,
            explanation: "Los dones del Espíritu son capacidades especiales dadas por el Espíritu Santo."
          }
        ],
        dificil: [
          {
            id: "db_d_1",
            question: "¿Cuántos ancianos aparecen en Apocalipsis?",
            options: ["12", "24", "36"],
            correct: 1,
            explanation: "24 ancianos aparecen en Apocalipsis 4:4."
          },
          {
            id: "db_d_2",
            question: "¿Qué significa la palabra 'justificación'?",
            options: ["Ser declarado justo", "Ser perdonado", "Ser santificado"],
            correct: 0,
            explanation: "La justificación es el acto por el cual Dios declara justo al pecador que cree."
          },
          {
            id: "db_d_3",
            question: "¿Qué es la propiciación?",
            options: ["Satisfacción de la ira divina", "Perdón de pecados", "Reconciliación"],
            correct: 0,
            explanation: "La propiciación es la satisfacción de la justicia divina mediante el sacrificio de Cristo."
          },
          {
            id: "db_d_4",
            question: "¿Qué es la expiación?",
            options: ["Cubrir el pecado", "Perdonar", "Reconciliar"],
            correct: 0,
            explanation: "La expiación significa cubrir o hacer satisfacción por el pecado."
          },
          {
            id: "db_d_5",
            question: "¿Qué es la santificación?",
            options: ["Proceso de transformación", "Perdón inicial", "Justificación"],
            correct: 0,
            explanation: "La santificación es el proceso continuo de transformación a la imagen de Cristo."
          }
        ]
      }
    }
  },
  
  achievements: {
    primerJuego: {
      id: "ach_1",
      name: "Primera Victoria",
      description: "Completa tu primer juego",
      icon: "trophy",
      condition: (stats) => stats.totalGames >= 1
    },
    experto: {
      id: "ach_2",
      name: "Experto Bíblico",
      description: "Consigue una puntuación perfecta en nivel difícil",
      icon: "star",
      condition: (stats) => stats.perfectGames.dificil >= 1
    },
    persistente: {
      id: "ach_3",
      name: "Persistente",
      description: "Juega 10 días seguidos",
      icon: "calendar",
      condition: (stats) => stats.streak >= 10
    }
  },
  
  levels: {
    facil: {
      minScore: 0,
      maxScore: 500,
      unlockRequirement: null
    },
    medio: {
      minScore: 501,
      maxScore: 1000,
      unlockRequirement: "Complete 5 juegos en nivel fácil"
    },
    dificil: {
      minScore: 1001,
      maxScore: null,
      unlockRequirement: "Complete 5 juegos en nivel medio"
    }
  }
};
            
