
  const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

  const canvas = document.getElementById('world');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const engine = Engine.create();
  engine.gravity.y = 1.2;
  const world = engine.world;

  const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: width,
      height: height,
      wireframes: false,
      background: 'transparent'
    }
  });

  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  const imageNaturalWidth = 250;
  const imageNaturalHeight = 80;
  const scale = 0.3;
  const bodyWidth = imageNaturalWidth * scale;
  const bodyHeight = imageNaturalHeight * scale;

  // Ground at the very bottom
  let ground = Bodies.rectangle(width / 2, height + 10, width, 20, {
    isStatic: true,
    render: { visible: false }
  });
  Composite.add(world, ground);

  // Spawn items in bulk once
  function spawnItems(count = 200) {
    for (let i = 0; i < count; i++) {
      const x = Math.random() * (width - bodyWidth) + bodyWidth / 2;
      const y = -Math.random() * height; // spawn above the screen randomly

      const item = Bodies.rectangle(x, y, bodyWidth, bodyHeight, {
        restitution: 0.7,
        frictionAir: 0.01,
        render: {
          sprite: {
            texture: '/assets/images/joint.svg',
            xScale: scale,
            yScale: scale
          }
        }
      });

      Composite.add(world, item);
    }
  }

  // Spawn all items once
  spawnItems(200);

  // Mouse drag/throw interaction
  const mouse = Mouse.create(canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false }
    }
  });
  Composite.add(world, mouseConstraint);
  render.mouse = mouse;

  // Resize handling
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    render.bounds.max.x = width;
    render.bounds.max.y = height;
    render.options.width = width;
    render.options.height = height;

    // Recreate ground at new height
    Composite.remove(world, ground);
    ground = Bodies.rectangle(width / 2, height + 10, width, 20, {
      isStatic: true,
      render: { visible: false }
    });
    Composite.add(world, ground);
  });

  // Pause physics when tab is inactive
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      Runner.stop(runner);
    } else {
      Runner.start(runner, engine);
    }
  });
