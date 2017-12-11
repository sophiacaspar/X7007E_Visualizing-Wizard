%! radkollaps pink
getResultFromQuiz(ans1, X, Y, ans1, _, ans1, ans4, ans4, radkollaps):-
	(
		X == ans1;
		X == ans2
	),
	(
		Y == ans1;
		Y == ans2
	).

%! radkollaps blue, green
getResultFromQuiz(X, _, _, ans1, _, Y, ans4, ans4, radkollaps):-
	(
		X == ans3,
		Y == ans4
	);
	(
		X == ans4, 
		Y == ans3
	).

%! klick pink
getResultFromQuiz(ans2, ans2, ans2, _, _, ans4, Q, ans3, klick):-
	(
		Q == ans1;
		Q == ans2;
		Q == ans3
	).

%! klick orange, green, blue
getResultFromQuiz(X, Y, Z, _, _, ans4, Q, ans3, klick):-
	(
		X == ans1;
		X == ans3;
		X == ans4
	),
	(
		Y == ans2;
		Y == ans3;
		Y == ans4
	),
	(
		Z == ans2;
		Z == ans3;
		Z == ans4
	),
	(
		Q == ans1;
		Q == ans2;
		Q == ans3
	).
