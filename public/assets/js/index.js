    // Initial Canvas Script

    const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

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

    let currentItem = null;

    function spawnNewItem() {
      // Ensure x keeps the entire item inside viewport horizontally
      const x = Math.random() * (width - bodyWidth) + bodyWidth / 2;
      const y = -bodyHeight - 20;

      const item = Bodies.rectangle(x, y, bodyWidth, bodyHeight, {
        restitution: 0.5,
        frictionAir: 0.02,
        render: {
          sprite: {
            texture: '/assets/images/joint.svg',
            xScale: scale,
            yScale: scale
          }
        },
        isSensor: true
      });

      Composite.add(world, item);
      currentItem = item;
    }

    // Start with one item
    spawnNewItem();

    // Check and spawn new one when current goes below screen
    Events.on(engine, 'afterUpdate', () => {
      if (currentItem && currentItem.position.y - bodyHeight > height) {
        Composite.remove(world, currentItem);
        spawnNewItem();
      }
    });

    // Pause simulation when tab is inactive
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        Runner.stop(runner);
      } else {
        Runner.start(runner, engine);
      }
    });

    // Resize support
    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      render.bounds.max.x = width;
      render.bounds.max.y = height;
      render.options.width = width;
      render.options.height = height;
    });
    
    
    // ------------------------------------------------------------------------------------
    
    
    // Second Canvas Script
    
    