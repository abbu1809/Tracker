export const dashboardApi = {
  calculateStats: (questions = []) => {
    const total = questions.length;
    const completed = questions.filter((q) => q.status === 'Completed').length;
    const inProgress = questions.filter((q) => q.status === 'In Progress').length;
    const pending = questions.filter((q) => q.status === 'Pending').length;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // DSA metrics
    const dsaQuestions = questions.filter((q) => q.category === 'DSA');
    const dsaTotal = dsaQuestions.length;
    const dsaCompleted = dsaQuestions.filter((q) => q.status === 'Completed').length;

    // Interview Questions (Git + Technical)
    const interviewQuestions = questions.filter(
      (q) => q.category === 'Git' || q.category === 'Technical'
    );
    const interviewTotal = interviewQuestions.length;
    const interviewCompleted = interviewQuestions.filter((q) => q.status === 'Completed').length;

    // Git specific
    const gitQuestions = questions.filter((q) => q.category === 'Git');
    const gitCompleted = gitQuestions.filter((q) => q.status === 'Completed').length;

    // Technical specific
    const techQuestions = questions.filter((q) => q.category === 'Technical');
    const techCompleted = techQuestions.filter((q) => q.status === 'Completed').length;

    // Machine Coding metrics
    const mcQuestions = questions.filter((q) => q.category === 'Machine Coding');
    const mcTotal = mcQuestions.length;
    const mcCompleted = mcQuestions.filter((q) => q.status === 'Completed').length;
    const mcInProgress = mcQuestions.filter((q) => q.status === 'In Progress').length;
    const mcPending = mcQuestions.filter((q) => q.status === 'Pending').length;

    // Difficulty breakdown
    const easyTotal = questions.filter((q) => q.difficulty === 'Easy').length;
    const easyCompleted = questions.filter((q) => q.difficulty === 'Easy' && q.status === 'Completed').length;
    const mediumTotal = questions.filter((q) => q.difficulty === 'Medium').length;
    const mediumCompleted = questions.filter((q) => q.difficulty === 'Medium' && q.status === 'Completed').length;
    const hardTotal = questions.filter((q) => q.difficulty === 'Hard').length;
    const hardCompleted = questions.filter((q) => q.difficulty === 'Hard' && q.status === 'Completed').length;

    return {
      total,
      completed,
      inProgress,
      pending,
      completionRate,
      dsa: {
        total: dsaTotal,
        completed: dsaCompleted,
        rate: dsaTotal > 0 ? Math.round((dsaCompleted / dsaTotal) * 100) : 0,
      },
      interview: {
        total: interviewTotal,
        completed: interviewCompleted,
        rate: interviewTotal > 0 ? Math.round((interviewCompleted / interviewTotal) * 100) : 0,
        git: { total: gitQuestions.length, completed: gitCompleted },
        technical: { total: techQuestions.length, completed: techCompleted },
      },
      machineCoding: {
        total: mcTotal,
        completed: mcCompleted,
        inProgress: mcInProgress,
        pending: mcPending,
        rate: mcTotal > 0 ? Math.round((mcCompleted / mcTotal) * 100) : 0,
      },
      difficulty: {
        easy: { total: easyTotal, completed: easyCompleted },
        medium: { total: mediumTotal, completed: mediumCompleted },
        hard: { total: hardTotal, completed: hardCompleted },
      },
    };
  },
};
