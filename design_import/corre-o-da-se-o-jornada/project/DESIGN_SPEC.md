# Biel Strategy — Notas de Arquitetura (Fase 2 · Design)

## Premissa (Vyro)
O site é um currículo vivo: precisa aceitar novos cursos, certificados, cases, projetos e tecnologias **sem reconstrução**. Isso nunca deve virar licença para aumento indiscriminado de conteúdo — síntese, hierarquia e a narrativa Marketing → Tecnologia → IA continuam acima de qualquer item novo. Preservar esta premissa ao encaminhar para o Claude Code.

## Onde a expansão já é suportada (sem redesenhar)
- **Selected Work** (`Casos` em `bs-construcao.jsx`): array `CASOS`. Novo case = novo item no array + `image-slot` novo. As abas absorvem qualquer quantidade; se crescer muito, curar para os 3–4 mais fortes em vez de listar tudo.
- **Credentials** (`Formacao`): array `CERTS` é uma lista de chips — novo certificado é um item novo. O link "Ver credenciais →" já está preparado para apontar a uma página futura sem mudar o layout atual.
- **Stack strip** (`StackStrip`): array `NIVEIS`, 5 categorias fixas (Marketing/Build/AI/Automação/Fundação). Nova tecnologia entra dentro da categoria certa como texto adicional — a estrutura de 5 categorias não deve crescer.
- **A Jornada** (`Jornada` em `bs-narrativa.jsx`): array `FASES`. Aceita uma nova fase, mas cada fase adicionada dilui a leitura da trajetória — preferir reescrever uma fase existente a empilhar uma sexta.
- **Chips de competência** (Marketing/Tecnologia/IA): arrays simples de string — adicionar é trivial, mas cada seção deve continuar cabendo em uma linha ou duas antes de precisar de scroll horizontal.

## Regra de guarda
Antes de adicionar qualquer item novo: ele substitui algo mais fraco, ou é estritamente necessário? Se não, vira `[VALIDAR]`/backlog em vez de entrar na superfície do site.
