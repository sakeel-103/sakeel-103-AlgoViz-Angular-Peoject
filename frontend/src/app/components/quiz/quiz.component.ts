import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { ViewEncapsulation } from '@angular/core';

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: string;
}

@Component({
  selector: 'app-graph-quiz',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('cardAnimation', [
      state('normal', style({ transform: 'scale(1)' })),
      state('flipped', style({ transform: 'scale(1.05)' })),
      transition('normal <=> flipped', animate('300ms ease-in-out')),
    ]),
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class QuizComponent implements OnInit {
  constructor(private authService: AuthService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('GraphExplorer Pro | Quiz');
    this.shuffleQuestions();
  }
  questions: Question[] = [
    {
      text: 'In a complete graph with n vertices, how many edges are there?',
      options: ['n', 'n-1', 'n(n-1)/2', '2^n'],
      correctAnswer: 2,
      difficulty: 'easy',
    },
    {
      text: 'What is the chromatic number of a planar graph?',
      options: ['2', '3', '4', '5'],
      correctAnswer: 2,
      difficulty: 'easy',
    },
    {
      text: 'In which type of graph is every vertex connected to every other vertex?',
      options: ['Tree', 'Bipartite', 'Complete', 'Cyclic'],
      correctAnswer: 2,
      difficulty: 'easy',
    },
    {
      text: 'What is the time complexity of depth-first search (DFS)?',
      options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'],
      correctAnswer: 0,
      difficulty: 'easy',
    },
    {
      text: 'What is the time complexity of breadth-first search (BFS)?',
      options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'],
      correctAnswer: 1,
      difficulty: 'easy',
    },
    {
      text: 'What is the minimum number of colors needed to color the vertices of a bipartite graph?',
      options: ['1', '2', '3', '4'],
      correctAnswer: 1,
      difficulty: 'easy',
    },
    {
      text: 'Which of the following is true about trees?',
      options: [
        'They are cyclic',
        'They have exactly V-1 edges',
        'They have multiple paths between nodes',
        'They can have more than one root',
      ],
      correctAnswer: 1,
      difficulty: 'easy',
    },
    {
      text: 'What is a complete graph?',
      options: [
        'A graph with no edges',
        'A graph where every pair of vertices is connected',
        'A graph with a single cycle',
        'A disconnected graph',
      ],
      correctAnswer: 1,
      difficulty: 'easy',
    },
    {
      text: 'Which algorithm can be used to check if a graph is connected?',
      options: ["Dijkstra's", 'DFS', 'BFS', "Prim's"],
      correctAnswer: 1,
      difficulty: 'easy',
    },
    {
      text: 'How many edges does a tree with n vertices have?',
      options: ['n-1', 'n', 'n+1', '2n'],
      correctAnswer: 0,
      difficulty: 'easy',
    },
    {
      text: 'Which of the following data structures is commonly used in implementing DFS?',
      options: ['Queue', 'Stack', 'Heap', 'HashMap'],
      correctAnswer: 1,
      difficulty: 'medium',
    },
    {
      text: 'What is the space complexity of DFS when implemented recursively?',
      options: ['O(V)', 'O(E)', 'O(V + E)', 'O(1)'],
      correctAnswer: 0,
      difficulty: 'medium',
    },
    {
      text: 'Which algorithm is used to detect cycles in an undirected graph?',
      options: ["Dijkstra's", 'BFS', 'DFS', 'Bellman-Ford'],
      correctAnswer: 2,
      difficulty: 'medium',
    },
    {
      text: 'In BFS, what is the main purpose of the queue?',
      options: [
        'To track visited nodes',
        'To store path costs',
        'To keep track of the next level of nodes',
        'To store parent nodes',
      ],
      correctAnswer: 2,
      difficulty: 'medium',
    },
    {
      text: 'Which of the following is true for DFS on a directed acyclic graph (DAG)?',
      options: [
        'There are no back edges',
        'It always finds a cycle',
        'It has the highest time complexity',
        'It can only visit each node once',
      ],
      correctAnswer: 0,
      difficulty: 'medium',
    },
    {
      text: 'What type of graph traversal is used in level-order traversal of a binary tree?',
      options: ['DFS', 'BFS', "Dijkstra's", "Prim's"],
      correctAnswer: 1,
      difficulty: 'medium',
    },
    {
      text: 'Which traversal algorithm can be used to find all nodes reachable from a given starting node?',
      options: [
        'DFS only',
        'BFS only',
        'Both DFS and BFS',
        'Neither DFS nor BFS',
      ],
      correctAnswer: 2,
      difficulty: 'medium',
    },
    {
      text: 'What is the minimum number of edges required to make a graph connected?',
      options: ['V', 'V - 1', 'E + 1', 'V + E'],
      correctAnswer: 1,
      difficulty: 'medium',
    },
    {
      text: 'Which statement is true about BFS on an unweighted graph?',
      options: [
        'It finds the shortest path in terms of edge count',
        'It always visits nodes in alphabetical order',
        'It always results in a spanning tree',
        'It is faster than DFS',
      ],
      correctAnswer: 0,
      difficulty: 'medium',
    },
    {
      text: 'What property is always true for a tree?',
      options: [
        'It has a cycle',
        'It is always complete',
        'It is connected and acyclic',
        'It has even nodes',
      ],
      correctAnswer: 2,
      difficulty: 'medium',
    },
    {
      text: 'In a strongly connected directed graph, what can DFS be used to identify?',
      options: [
        'Cycles',
        'Connected components',
        'Topological order',
        'Strongly connected components',
      ],
      correctAnswer: 3,
      difficulty: 'difficult',
    },
    {
      text: 'Which algorithm can detect and handle articulation points in a graph?',
      options: ['DFS', 'BFS', "Dijkstra's", 'Bellman-Ford'],
      correctAnswer: 0,
      difficulty: 'difficult',
    },
    {
      text: 'What is the primary difference in space complexity between BFS and DFS?',
      options: [
        'BFS requires more space in general',
        'DFS requires more space in general',
        'Both require the same space',
        'BFS only requires O(1) space',
      ],
      correctAnswer: 0,
      difficulty: 'difficult',
    },
    {
      text: 'In an undirected graph, which traversal is more efficient for finding the shortest path in terms of edges?',
      options: ['DFS', 'BFS', "Dijkstra's", "Prim's"],
      correctAnswer: 1,
      difficulty: 'difficult',
    },
    {
      text: 'Which algorithm is best suited to find bridges in an undirected graph?',
      options: ['DFS', 'BFS', 'Kruskal’s', 'Floyd-Warshall'],
      correctAnswer: 0,
      difficulty: 'difficult',
    },
    {
      text: 'In a directed graph, what will be the result of performing DFS from a given source node?',
      options: [
        'All reachable nodes from the source',
        'All nodes in the graph',
        'The shortest path to each node',
        'The minimum spanning tree',
      ],
      correctAnswer: 0,
      difficulty: 'difficult',
    },
    {
      text: 'How many connected components are created when an articulation point is removed from a graph?',
      options: ['1', '2', 'It depends on the graph structure', 'None'],
      correctAnswer: 2,
      difficulty: 'difficult',
    },
    {
      text: 'Which of the following is true about DFS tree edges in a directed graph?',
      options: [
        'They form cycles',
        'They point to unvisited vertices',
        'They always connect vertices on the same level',
        'They are part of the DFS forest',
      ],
      correctAnswer: 1,
      difficulty: 'difficult',
    },
    {
      text: 'In BFS, if a graph has cycles, which nodes are revisited?',
      options: [
        'No nodes are revisited if marked as visited',
        'Only nodes in the cycle',
        'Only nodes with lower indices',
        'All nodes',
      ],
      correctAnswer: 0,
      difficulty: 'difficult',
    },
    {
      text: 'Which of the following techniques can be used to find articulation points in an undirected graph?',
      options: [
        'DFS with parent tracking',
        'BFS with distance matrix',
        'DFS with stack',
        'BFS with queue',
      ],
      correctAnswer: 0,
      difficulty: 'difficult',
    },
  ];

  currentQuestionIndex: number = 0;
  selectedAnswerIndex: number | null = null;
  answerSubmitted: boolean = false;
  score: number = 0;
  quizCompleted: boolean = false;
  quizStarted: boolean = false;
  animationState: string = 'normal';
  showCorrectAnswerIndex: number | null = null;

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  get progressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  allQuestions: Question[] = [...this.questions];

  startQuiz(difficulty: string) {
    this.quizStarted = true;
    this.questions = this.allQuestions.filter(
      (q) => q.difficulty === difficulty
    );
    this.currentQuestionIndex = 0;
    this.selectedAnswerIndex = null;
    this.answerSubmitted = false;
    this.score = 0;
  }

  selectAnswer(index: number) {
    this.selectedAnswerIndex = index;
  }
  incorrectAnswers: number = 0;

  submitAnswer() {
    if (this.selectedAnswerIndex === null) return;

    this.answerSubmitted = true;
    this.animationState = 'flipped';

    if (this.selectedAnswerIndex === this.currentQuestion.correctAnswer) {
      this.score++;
    }

    console.log(
      'Selected:',
      this.selectedAnswerIndex,
      'Correct:',
      this.currentQuestion.correctAnswer
    );

    setTimeout(() => {
      this.animationState = 'normal';
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.nextQuestion();
      } else {
        this.quizCompleted = true;
      }
    }, 3000); // Delay for 5 seconds
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.selectedAnswerIndex = null;
    this.answerSubmitted = false;
    this.showCorrectAnswerIndex = null;
  }

  restartQuiz() {
    this.quizStarted = false;
    this.currentQuestionIndex = 0;
    this.selectedAnswerIndex = null;
    this.answerSubmitted = false;
    this.score = 0;
    this.quizCompleted = false;
    this.questions = [...this.allQuestions];
    this.shuffleQuestions();
    this.showCorrectAnswerIndex = null;
  }

  // ✅ Back Button Functionality
  goBack(): void {
    window.history.back();
  }
}
