# Backend Challenge Instructions
>[!NOTE]
><details><summary>Vagrant Setup</summary>
>
>The Vagrant setup can be found in the branch [BCC-03-configure-local-env](./docs/vagrant-setup.md).
>
></details>

1. Unzip the original repository.

2. Create a new private repository on your GitHub account.

3. Clone your new repository to your local development environment.

4. Copy the content from the original repository to your new repository.

5. Make the initial commit.

6. Bellow in this document you will find the tasks to be completed within this challenge. The tasks should be performed in order. For each task, create a new branch with the same name of the task. All the tasks are described in different documents in the folder `docs`. For example, for the first task named `BCC-01-req-analysis-and-domain-model.md` you should create a branch named `BCC-01-create-domain-model`.

7. Once you complete a task, create a pull request with the main branch as the base.

8. For the next task, create a new branch from the branch of the previous task (not from the main branch). When
   finished, create a pull request with the branch of the previous task as the base.

9. Repeat step 8 for all remaining tasks.


### Branching Strategy


![Branching strategy](./docs/images/branching-strategy.png)

Remember that each pull request should be reviewed and approved before being merged with the base branch. Keep your
commits small and frequent to facilitate code review.

### Tasks

<details>
<summary>Requirements Analysis and Domain model</summary>

[Requirements Analysis and modeling](./docs/BCC-01-req-analysis-and-domain-model.md)

</details>

<details>
<summary>Database model</summary>

[Relational database model](./docs/BCC-02-database-model.md)

</details>

<details>
<summary>Local dev environment configuration</summary>

[Configure local development environment](./docs/BCC-03-configure-local-env.md)

</details>

<details>
<summary>DB Models implementation </summary>

[DB Models implementation](./docs/BCC-04-DB-models-implementation.md)

</details>

<details>
<summary>Lambdas implementation </summary>

[Lambdas implementation](./docs/BCC-05-lambdas-implementation.md)

</details>
