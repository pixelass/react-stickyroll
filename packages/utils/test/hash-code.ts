import test from "ava";
import {hashCode} from "../src";

test("hashCode returns a hash", t => {
	const expected = "hNzmTt";
	const actual = hashCode(`
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan dui odio, non consequat
		magna sagittis laoreet. Phasellus ut imperdiet magna. Donec consectetur urna sed blandit rutrum.
		Donec sed scelerisque justo. Maecenas luctus felis non condimentum posuere. Nam nulla metus,
		viverra eu mauris quis, dignissim sodales turpis. In rutrum posuere sollicitudin. Integer et
		faucibus urna. Nulla dignissim dui sed ex consectetur elementum. Aenean ullamcorper neque
		ligula, quis congue metus porttitor quis. Donec bibendum aliquet risus auctor facilisis.
		Phasellus metus quam, bibendum ac metus at, venenatis sollicitudin ipsum. Aliquam erat volutpat.
		Ut consequat interdum porttitor.
	
		Phasellus pharetra, dolor quis sollicitudin auctor, libero justo commodo nibh, a pretium tellus
		dui sit amet odio. Nam commodo euismod diam, vel vulputate metus tincidunt sed. Quisque
		venenatis lectus eget aliquam ullamcorper. Morbi mattis pretium turpis non sollicitudin. Nunc
		commodo dui id iaculis lacinia. Sed eget sem vel urna posuere convallis. Sed neque ipsum,
		ultrices vitae maximus in, euismod vel elit. Suspendisse sed erat quis nunc tempus viverra ut ac
		odio. Nulla congue hendrerit euismod. Nullam at turpis velit. Duis eleifend ex eget accumsan
		convallis. Aenean ut iaculis turpis. Nulla sit amet faucibus leo. Proin tempus diam in lorem
		fringilla imperdiet.
	
		Nulla sit amet placerat lacus, non facilisis augue. Sed dui risus, fermentum at maximus eget,
		mattis a turpis. Ut convallis ante orci, sit amet dignissim arcu posuere ac. Etiam tincidunt,
		lorem vitae maximus ultricies, lectus magna volutpat felis, id sollicitudin diam eros quis nunc.
		Aliquam vitae ullamcorper neque. Maecenas nunc nisi, facilisis quis feugiat dictum, suscipit
		tempus odio. Donec non sollicitudin orci, quis bibendum orci. Mauris eu bibendum odio.
	`);
	t.is(expected, actual);
});

test("hashCode returns different hashes", t => {
	const expected_1 = "dlYGaV";
	const actual_1 = hashCode("1");
	const expected_2 = "cbKQML";
	const actual_2 = hashCode("2");
	t.is(expected_1, actual_1);
	t.is(expected_2, actual_2);
});
