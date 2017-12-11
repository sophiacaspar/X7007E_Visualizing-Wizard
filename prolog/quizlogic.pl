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

%! radkollaps
getResultFromQuiz(X, _, _, ans1, _, _, ans4, ans4, radkollaps):-
	X \== ans2.

%! klick pink
getResultFromQuiz(ans2, ans2, ans2, _, _, ans4, Q, ans3, klick):-
	(
		Q == ans1;
		Q == ans2;
		Q == ans3
	).

%! klick + skroll
getResultFromQuiz(X, Y, Z, _, _, _, Q, ans3, Result):-
	X \== ans2,
	Y \== ans1,
	Z \== ans1,
	Q \== ans4,

	(
		Result = klick;
		Result = skroll
	).


%! squish
getResultFromQuiz(_, _, X, _, _, _, Y, Z, squish):-
	(
		X == ans1;
		X == ans2
	),
		Y \== ans4,
	(
		Z == ans1;
		Z == ans2
	).

%! squish
getResultFromQuiz(_, _, X, _, _, _, Y, Z, squish):-
	(
		X == ans1;
		X == ans2
	),
	(
		Y == ans4;
		Z == ans4
	).

